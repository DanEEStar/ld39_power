import * as AssetUtils from '../utils/assetUtils';
import Music from "../utils/music";

export default class Preloader extends Phaser.State {
    public preload(): void {
        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    private startGame(): void {
        Music.createInstance(this.game);
        Music.getInstance().create();
        Music.getInstance().play();
        this.loadTitle();
    }

    private loadTitle(): void {
        this.game.state.start('title', true, false, 1);
    }
}
