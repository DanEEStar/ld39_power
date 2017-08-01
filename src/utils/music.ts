import * as Assets from '../assets';

export default class Music {
    private static _instance: Music;

    public static createInstance(game: Phaser.Game) {
        this._instance = new Music(game);
    }

    public static getInstance(): Music {
        return Music._instance;
    }

    private track1 = null;
    private track2 = null;
    private track3 = null;
    private track4 = null;
    private track5 = null;

    private game: Phaser.Game = null;

    private playbackRate = 1.0;

    private stopped = false;

    public constructor(game: Phaser.Game) {
        this.game = game;
    }

    public create(): void {
        this.track1 = this.game.add.audio(Assets.Audio.AudioTrack1.getName());
        this.track1.volume = 0.8;
        this.track2 = this.game.add.audio(Assets.Audio.AudioTrack2.getName());
        this.track2.volume = 0.5;
        this.track3 = this.game.add.audio(Assets.Audio.AudioTrack3.getName());
        this.track4 = this.game.add.audio(Assets.Audio.AudioTrack4.getName());
        this.track4.volume = 0.8;
        this.track5 = this.game.add.audio(Assets.Audio.AudioTrack5.getName());
        this.track5.volume = 0.8;
    }

    public play(): void {
        this.stopped = false;
        this.playLoop(0);
    }

    public stop(): void {
        this.stopped = true;
        this.track1.stop();
        this.track2.stop();
        this.track3.stop();
        this.track4.stop();
        this.track5.stop();
    }

    public pause(): void {
        this.track1.pause();
        this.track2.pause();
        this.track3.pause();
        this.track4.pause();
        this.track5.pause();
    }

    public unpause(): void {
        this.track1.play();
        this.track2.play();
        this.track3.play();
        this.track4.play();
        this.track5.play();
    }

    public setPlaybackRate(playbackRate): void {
        this.playbackRate = playbackRate;
        if (this.track1._sound) {
            this.track1._sound.playbackRate.value = this.playbackRate;
        }
        if (this.track2._sound) {
            this.track2._sound.playbackRate.value = this.playbackRate;
        }
        if (this.track3._sound) {
            this.track3._sound.playbackRate.value = this.playbackRate;
        }
        if (this.track4._sound) {
            this.track4._sound.playbackRate.value = this.playbackRate;
        }
        if (this.track5._sound) {
            this.track5._sound.playbackRate.value = this.playbackRate;
        }
    }

    private playLoop(loopCounter) {
        if (this.stopped) {
            return;
        }

        const self = this;
        const trackLoop = [
            //[1],
            [1, 2, 5],
            [1, 2, 3, 4, 5],
            [3, 4, 5],
            //[3]
        ];

        loopCounter = loopCounter % 3;

        trackLoop[loopCounter].forEach(function(value, index) {
            const audio = self['track' + value];
            audio.onStop.removeAll();
            audio.play();
            audio._sound.playbackRate.value = self.playbackRate;
            if (index === 0) {
                audio.onStop.add(function() {
                    self.playLoop(loopCounter + 1);
                });
            }
        });
    }
}
