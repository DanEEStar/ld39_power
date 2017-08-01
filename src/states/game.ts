import * as Assets from '../assets';
import Music from '../utils/music';


const MAX_POWER = 500;
const POWER_TWEEN_DURATION = 10000;

export default class GameState extends Phaser.State {
    private levelNumber = 1;

    private cursors: Phaser.CursorKeys;

    private shadowTexture: Phaser.BitmapData = null;
    private lightSprite: Phaser.Image = null;
    private localFontText: Phaser.Text = null;

    private map: Phaser.Tilemap;
    private layer: Phaser.TilemapLayer;

    private powerupSound: Phaser.Sound;

    private hero: Phaser.Sprite = null;
    private goal: Phaser.Sprite = null;
    private power = null;
    private powerTween: Phaser.Tween;
    private speed = 0;


    private powerstars: Array<Phaser.Sprite> = [];

    public init(level) {
        this.levelNumber = level;
    }

    preload() {
        this.load.tilemap('tilemap', require('assets/map_level' + this.levelNumber + '.csv'), null, Phaser.Tilemap.CSV);
    }

    public create(): void {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.powerupSound = this.game.add.sound(Assets.Audio.Powerup.getName());

        this.map = this.add.tilemap('tilemap', 48, 48, 960, 576);
        this.map.addTilesetImage(Assets.Images.ImagesTileset.getName());
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(16, 31);

        this.loadSpecialTiles();

        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
        this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;

        Music.getInstance().setPlaybackRate(1.0);

        this.speed = 300;
        this.power = {value: MAX_POWER};
        this.powerTween = this.add.tween(this.power).to( { value: 0 }, POWER_TWEEN_DURATION, Phaser.Easing.Quadratic.Out, true);

        this.localFontText = this.game.add.text(10, 586, this.createPowerString(this.power.value / MAX_POWER), {
            font: '30px ' + Assets.CustomWebFonts.ThirteenPixelFont.getFamily(),
            fill: 'white',
            stroke: 'yellow'
        });
    }

    private loadSpecialTiles(): void {
        for (let x = 0; x < this.map.width; x += 1) {
            for (let y = 0; y < this.map.height; y += 1) {
                let tile = this.map.getTile(x, y, this.layer);

                if (tile && tile.index === 0) {
                    this.map.putTile(32, x, y, this.layer);
                    this.hero = this.game.add.sprite(x * 48 + 24, y * 48 + 24, Assets.Spritesheets.Hero.getName());
                    this.hero.anchor.set(0.5, 0.5);
                    this.hero.animations.add('right', [0, 1]);
                    this.hero.animations.add('left', [2, 3]);
                    this.hero.animations.add('down', [4, 5]);
                    this.hero.animations.add('up', [6, 7]);
                    this.hero.animations.play('down', 5, true);

                    this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
                    this.hero.body.setSize(44, 48, 2, 0);
                }

                if (tile && tile.index === 1) {
                    this.map.putTile(32, x, y, this.layer);
                    this.goal = this.game.add.sprite(x * 48 + 24, y * 48 + 24, Assets.Spritesheets.Goal.getName());
                    this.goal.anchor.set(0.5, 0.5);

                    this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
                    this.goal.body.setSize(44, 44, 2, 2);
                }

                if (tile && tile.index === 2) {
                    this.map.putTile(32, x, y, this.layer);
                    let powerstar = this.game.add.sprite(x * 48 + 24, y * 48 + 24, Assets.Spritesheets.PowerStar.getName());
                    powerstar.anchor.set(0.5, 0.5);
                    this.game.physics.enable(powerstar, Phaser.Physics.ARCADE);
                    powerstar.body.setSize(40, 40, 4, 4);
                    this.powerstars.push(powerstar);
                }
            }
        }
    }

    private createPowerString(powerValuePercent) {
        const len = Math.floor(powerValuePercent * 70 + 1);
        return 'Power ' + Array(len).join('|');
    }

    public heroPowerstarCollision(hero, powerstar) {
        powerstar.kill();
        this.powerupSound.play();
        this.power.value = MAX_POWER;
        this.powerTween.stop();
        this.powerTween = this.add.tween(this.power).to( { value: 0 }, POWER_TWEEN_DURATION, Phaser.Easing.Quadratic.Out, true);
    }

    public update(): void {
        const self = this;
        // this.tintValue += 1;
        this.game.physics.arcade.collide(this.hero, this.layer);

        this.powerstars.forEach(function(powerstar) {
            self.game.physics.arcade.collide(self.hero, powerstar, function() {
                self.heroPowerstarCollision(self.hero, powerstar);
            }, null, this);
        });

        self.game.physics.arcade.collide(self.hero, self.goal, function() {
            self.goal.kill();
            self.game.state.start('levelchange', true, false, self.levelNumber + 1);
        });

        this.hero.body.velocity.set(0);

        if (this.cursors.up.isDown) {
            this.hero.body.velocity.y -= this.speed;
            this.hero.animations.play('up', 5, true);
        }
        else if (this.cursors.down.isDown) {
            this.hero.body.velocity.y += this.speed;
            this.hero.animations.play('down', 5, true);
        }

        if (this.cursors.left.isDown) {
            this.hero.body.velocity.x -= this.speed;
            this.hero.animations.play('left', 5, true);
        } else if (this.cursors.right.isDown) {
            this.hero.body.velocity.x += this.speed;
            this.hero.animations.play('right', 5, true);
        }

        this.updateShadowTexture(this.hero);

        const musicPlaybackRate = 0.8 + (this.power.value / 1000);
        if (musicPlaybackRate < 1.0) {
            Music.getInstance().setPlaybackRate(musicPlaybackRate);
        }
        else {
            Music.getInstance().setPlaybackRate(1.0);
        }

        this.localFontText.setText(this.createPowerString(this.power.value / MAX_POWER));
    }

    private updateShadowTexture(hero: Phaser.Sprite): void {

        this.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
        this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height - 64);

        const radius = (1.5 * this.power.value) + 50,
            heroX = hero.x,
            heroY = hero.y;

        let gradient = this.shadowTexture.context.createRadialGradient(
                heroX, heroY, (1.5 * this.power.value) + 20,
                heroX, heroY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
        this.shadowTexture.context.fill();

        this.shadowTexture.dirty = true;
    }

    public render(): void {
        // this.game.debug.body(this.hero);
    }
}
