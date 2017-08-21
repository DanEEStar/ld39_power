/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class ImagesTileset {
        static getName(): string { return 'tileset'; }

        static getPNG(): string { return require('assets/images/tileset.png'); }
    }

    export class Background {
        static getName(): string { return 'background'; }

        static getPNG(): string { return require('assets/images/background.png'); }
    }

    export class Help {
        static getName(): string { return 'help'; }

        static getPNG(): string { return require('assets/images/help.png'); }
    }
}

export namespace Spritesheets {
    export class Hero {
        static getName(): string { return 'hero'; }

        static getPNG(): string { return require('assets/spritesheets/bunnyspritesheet.png'); }
        static getFrameWidth(): number { return 48; }
        static getFrameHeight(): number { return 48; }
        static getFrameMax(): number { return 8; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }

    export class PowerStar {
        static getName(): string { return 'powerstar'; }

        static getPNG(): string { return require('assets/spritesheets/powerstar.png'); }
        static getFrameWidth(): number { return 48; }
        static getFrameHeight(): number { return 48; }
        static getFrameMax(): number { return 1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }

    export class Goal {
        static getName(): string { return 'goal'; }

        static getPNG(): string { return require('assets/spritesheets/goal.png'); }
        static getFrameWidth(): number { return 48; }
        static getFrameHeight(): number { return 48; }
        static getFrameMax(): number { return 1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
}

export namespace Atlases {
}

export namespace Audio {
    export class AudioTrack1 {
        static getName(): string { return 'track1'; }

        static getMP3(): string { return require('assets/audio/track1.mp3'); }
    }
    export class AudioTrack2 {
        static getName(): string { return 'track2'; }

        static getMP3(): string { return require('assets/audio/track2.mp3'); }
    }
    export class AudioTrack3 {
        static getName(): string { return 'track3'; }

        static getMP3(): string { return require('assets/audio/track3.mp3'); }
    }
    export class AudioTrack4 {
        static getName(): string { return 'track4'; }

        static getMP3(): string { return require('assets/audio/track4.mp3'); }
    }
    export class AudioTrack5 {
        static getName(): string { return 'track5'; }

        static getMP3(): string { return require('assets/audio/track5.mp3'); }
    }

    export class Powerup {
        static getName(): string { return 'powerup'; }
        static getMP3(): string { return require('assets/audio/powerup.mp3'); }
    }

    export class Carrot {
        static getName(): string { return 'carrot'; }
        static getMP3(): string { return require('assets/audio/carrot.mp3'); }
    }
}

export namespace Audiosprites {
}

export namespace CustomWebFonts {
    export class ThirteenPixelFont {
        static getName(): string { return 'thirteen_pixel_fonts'; }

        static getFamily(): string { return 'Thirteen Pixel Fonts Regular'; }

        static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.css'); }
        static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.eot'); }
        static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.svg'); }
        static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.ttf'); }
        static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.woff'); }
    }
}
