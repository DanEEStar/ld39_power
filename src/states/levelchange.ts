import Music from "../utils/music";

export default class LevelChange extends Phaser.State {
    private level = 1;

    init(level): void {
        this.level = level;
    }

    public create(): void {
        Music.getInstance().setPlaybackRate(1.0);

        if (this.level > 5) {
            this.game.state.start('win');
        }
        else {
            this.game.state.start('game', true, false, this.level);
        }
    }
}
