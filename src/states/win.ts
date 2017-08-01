import * as Assets from '../assets';

export default class Win extends Phaser.State {

    create() {
        let image = this.game.add.image(0, 0, Assets.Images.Background.getName());

        image.inputEnabled = true;
        image.events.onInputDown.add(() => {
            this.game.state.start('title');
        });

        let style = { font: '42px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center' };
        let startText1 = this.game.add.text(480, 450, 'The developers power', style);
        startText1.anchor.x = 0.5;
        let startText2 = this.game.add.text(480, 500, 'is running out...', style);
        startText2.anchor.x = 0.5;

        let titleText = this.game.add.text(480, 100, 'You Win!', {
            font: '66px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center'
        });
        titleText.anchor.x = 0.5;


        let hero = this.game.add.sprite(400, 300, Assets.Spritesheets.Hero.getName());
        hero.anchor.set(0.5, 0.5);
        hero.scale.set(3);
        hero.animations.add('down', [4, 5]);
        hero.animations.play('down', 5, true);

        let goal = this.game.add.sprite(960 - 400, 300, Assets.Spritesheets.Goal.getName());
        goal.anchor.set(0.5, 0.5);
        goal.scale.set(3);
    }

}
