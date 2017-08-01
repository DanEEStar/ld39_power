import * as Assets from '../assets';

export default class Title extends Phaser.State {

    create() {
        this.game.add.image(0, 0, Assets.Images.Background.getName());

        let style = { font: '42px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center' };
        let startText = this.game.add.text(480, 340, 'Start', style);
        startText.anchor.x = 0.5;
        startText.inputEnabled = true;
        startText.events.onInputDown.add(() => {
            this.game.state.start('levelchange', true, false, 1);
        });

        let helpText = this.game.add.text(480, 400, 'Help', style);
        helpText.anchor.x = 0.5;
        helpText.inputEnabled = true;
        helpText.events.onInputDown.add(() => {
            this.game.state.start('help');
        });

        let titleText = this.game.add.text(480, 160, 'Carrot Labyrinth', {
            font: '66px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center'
        });
        titleText.anchor.x = 0.5;

        let hero = this.game.add.sprite(260, 400, Assets.Spritesheets.Hero.getName());
        hero.anchor.set(0.5, 0.5);
        hero.scale.set(3);
        hero.animations.add('down', [4, 5]);
        hero.animations.play('down', 5, true);

        let goal = this.game.add.sprite(960 - 260, 400, Assets.Spritesheets.Goal.getName());
        goal.anchor.set(0.5, 0.5);
        goal.scale.set(3);
    }

}
