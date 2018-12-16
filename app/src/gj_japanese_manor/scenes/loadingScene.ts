///<reference path="../../phaser.d.ts"/>
import {The_Fool, The_Jailbait, The_Naughty_Nerd, The_Sexy_Samurai} from "../../shared/playerCombat";
import {SelectedPlayer} from "../selectedPlayer";
import {SoundAssetGlobals} from "../soundAssetGlobals";

export class LoadingScene extends Phaser.Scene {
    private types: string[] = [The_Sexy_Samurai.TYPE, The_Naughty_Nerd.TYPE, The_Jailbait.TYPE, The_Fool.TYPE];

    private complimentsDaisy;
    private complimentsFranzi;
    private complimentsNanni;
    private complimentsKlara;

    private insultsToNanniFromDaisy;
    private insultsToNanniFromFranzi;
    private insultsToNanniFromKlara;

    private insultsToOiwaFromDaisy;
    private insultsToOiwaFromFranzi;
    private insultsToOiwaFromKlara;

    private insultsToDaisyFromFranzi;
    private insultsToDaisyFromNanni;
    private insultsToDaisyFromKlara;

    private insultsToKlaraFromDaisy;
    private insultsToKlaraFromFranzi;
    private insultsToKlaraFromNanni;

    private insultsToFranziFromDaisy;
    private insultsToFranziFromNanni;
    private insultsToFranziFromKlara;

    private generalInsultsDaisy;
    private generalInsultsFranzi;
    private generalInsultsNanni;
    private generalInsultsKlara;

    private generalDefensiveDaisy;
    private generalDefensiveFranzi;
    private generalDefensiveNanni;
    private generalDefensiveKlara;

    private exclamationDaisy;
    private exclamationFranzi;
    private exclamationNanni;
    private exclamationKlara;

    private baseAttackDaisy;
    private baseAttackKlara;

    private boostedDMGDaisy;

    private spellOneDaisy;
    private spellOneNanni;
    private spellOneKlara;

    private spellTwoNanni;

    private spellThreeNanni;

    private ultimateDaisy;

    public ultimateArrayForSounds: Map<string, string[]>;

    constructor() {
        super({
            key: "LoadingScene"
        });
        this.ultimateArrayForSounds = new Map<string, string[]>();
    }

    preload(): void {
        this.load.image('startLoadingBackground', 'assets/backgrounds/JM_Back_LoadingScene.png');
        this.load.image('startBackground', 'assets/backgrounds/JM_Back_StartScene.png');
        this.load.image('startBtn', 'assets/game/start_button.png');
        // how to use this?
        this.load.bitmapFont('Connection', 'assets/font/Connection.bmp');
        this.load.image('sexySamurai', 'assets/characters/Zhe sexy samurai Portrait sketch.png');
        this.load.image('naughtyNerd', 'assets/characters/Naughty Nerd Portrait Sketch.png');
        this.load.image('jailbait', 'assets/characters/Jailbait Portrait Sketch.png');
        this.load.image('fool', 'assets/characters/Fool Portrait Sketch.png');
        this.load.audio('bla', (SoundAssetGlobals.SOUND_URL_DAISY+1+'.wav').toString());

        for (var i = 1; i <= 20; i++) {
            this.load.audio((SoundAssetGlobals.SOUND_NAME_DAISY+i).toString(), (SoundAssetGlobals.SOUND_URL_DAISY+i+'.wav').toString());
            if(i <= 15){
                this.load.audio((SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString(), (SoundAssetGlobals.SOUND_URL_FRANZI+i+'.wav').toString());
            }
            if(i <= 18){
                this.load.audio((SoundAssetGlobals.SOUND_NAME_KLARA+i).toString(), (SoundAssetGlobals.SOUND_URL_KLARA+i+'.wav').toString());
                this.load.audio((SoundAssetGlobals.SOUND_NAME_NANNI+i).toString(), (SoundAssetGlobals.SOUND_URL_NANNI+i+'.wav').toString());
            }
        }
    }

    create(): void {
        this.complimentsDaisy = [];
        this.complimentsFranzi = [];
        this.complimentsNanni = [];
        this.complimentsKlara = [];

        this.insultsToNanniFromDaisy = [];
        this.insultsToNanniFromFranzi = [];
        this.insultsToNanniFromKlara = [];

        this.insultsToOiwaFromDaisy = [];
        this.insultsToOiwaFromFranzi = [];
        this.insultsToOiwaFromKlara = [];

        this.insultsToDaisyFromFranzi = [];
        this.insultsToDaisyFromNanni = [];
        this.insultsToDaisyFromKlara = [];

        this.insultsToKlaraFromDaisy = [];
        this.insultsToKlaraFromFranzi = [];
        this.insultsToKlaraFromNanni = [];

        this.insultsToFranziFromDaisy = [];
        this.insultsToFranziFromNanni = [];
        this.insultsToFranziFromKlara = [];

        this.generalInsultsDaisy = [];
        this.generalInsultsFranzi = [];
        this.generalInsultsNanni = [];
        this.generalInsultsKlara = [];

        this.generalDefensiveDaisy = [];
        this.generalDefensiveFranzi = [];
        this.generalDefensiveNanni = [];
        this.generalDefensiveKlara = [];

        this.exclamationDaisy = [];
        this.exclamationFranzi = [];
        this.exclamationNanni = [];
        this.exclamationKlara = [];

        this.baseAttackDaisy = [];
        this.baseAttackKlara = [];

        this.boostedDMGDaisy = [];

        this.spellOneDaisy = [];
        this.spellOneNanni = [];
        this.spellOneKlara = [];

        this.spellTwoNanni = [];

        this.spellThreeNanni = [];

        this.ultimateDaisy = [];
        for (var i = 1; i <= 20; i++) {
            this.sound.add((SoundAssetGlobals.SOUND_NAME_DAISY+i).toString());
            if(i <= 15){
                this.sound.add((SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString());
            }
            if(i <= 18){
                this.sound.add((SoundAssetGlobals.SOUND_NAME_KLARA+i).toString());
                this.sound.add((SoundAssetGlobals.SOUND_NAME_NANNI+i).toString());
            }

            if(i >= 1 && i <= 3){
                this.complimentsDaisy[i-1] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.complimentsNanni[i-1] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
                this.complimentsKlara[i-1] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                if (i < 3) {
                    this.complimentsFranzi[i-1] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                }
                if (i == 3) {
                    this.insultsToNanniFromFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                }
            }
            if(i == 4) {
                this.insultsToNanniFromDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.insultsToNanniFromKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.insultsToOiwaFromFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.insultsToDaisyFromNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if(i == 5) {
                this.insultsToOiwaFromDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.insultsToDaisyFromFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.insultsToKlaraFromNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
                this.insultsToOiwaFromKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
            }
            if (i == 6){
                this.insultsToKlaraFromDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.insultsToKlaraFromFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.insultsToFranziFromNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
                this.insultsToDaisyFromKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
            }

            if (i == 7) {
                this.insultsToFranziFromDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.insultsToFranziFromKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.generalInsultsFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalInsultsNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 8) {
                this.generalInsultsDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalInsultsFranzi[1] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalInsultsNanni[1] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
                this.generalInsultsKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
            }

            if (i == 9) {
                this.generalInsultsDaisy[1] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalInsultsFranzi[2] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalInsultsNanni[2] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
                this.generalInsultsKlara[1] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
            }

            if (i == 10) {
                this.generalInsultsDaisy[2] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalInsultsKlara[2] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.generalDefensiveFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalDefensiveNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 11) {
                this.generalDefensiveDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalDefensiveKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.generalDefensiveFranzi[1] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalDefensiveNanni[1] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 12) {
                this.generalDefensiveDaisy[1] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalDefensiveKlara[1] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.generalDefensiveFranzi[2] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalDefensiveNanni[2] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 13) {
                this.generalDefensiveDaisy[2] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalDefensiveKlara[2] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.generalDefensiveFranzi[3] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.generalDefensiveNanni[3] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 14) {
                this.generalDefensiveDaisy[3] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.generalDefensiveKlara[3] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.exclamationFranzi[0] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.exclamationNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 15) {
                this.exclamationDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.exclamationKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.exclamationFranzi[1] = (SoundAssetGlobals.SOUND_NAME_FRANZI+i).toString();
                this.exclamationNanni[1] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 16) {
                this.exclamationDaisy[1] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.exclamationKlara[1] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.spellOneNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 17) {
                this.baseAttackDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.baseAttackKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.spellTwoNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 18) {
                this.boostedDMGDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
                this.spellOneKlara[0] = (SoundAssetGlobals.SOUND_NAME_KLARA+i).toString();
                this.spellThreeNanni[0] = (SoundAssetGlobals.SOUND_NAME_NANNI+i).toString();
            }

            if (i == 19) {
                this.spellOneDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
            }

            if (i == 20) {
                this.ultimateDaisy[0] = (SoundAssetGlobals.SOUND_NAME_DAISY+i).toString();
            }
        }
        this.ultimateArrayForSounds = new Map<string, string[]>();
        this.ultimateArrayForSounds.set("complimentsDaisy", this.complimentsDaisy);
        this.ultimateArrayForSounds.set("complimentsFranzi", this.complimentsFranzi);
        this.ultimateArrayForSounds.set("complimentsNanni", this.complimentsNanni);
        this.ultimateArrayForSounds.set("complimentsKlara", this.complimentsKlara);
        this.ultimateArrayForSounds.set("insultsToNanniFromDaisy", this.insultsToNanniFromDaisy);
        this.ultimateArrayForSounds.set("insultsToNanniFromFranzi", this.insultsToNanniFromFranzi);
        this.ultimateArrayForSounds.set("insultsToNanniFromKlara", this.insultsToNanniFromKlara);
        this.ultimateArrayForSounds.set("insultsToOiwaFromDaisy", this.insultsToOiwaFromDaisy);
        this.ultimateArrayForSounds.set("insultsToOiwaFromFranzi", this.insultsToOiwaFromFranzi);
        this.ultimateArrayForSounds.set("insultsToOiwaFromKlara", this.insultsToOiwaFromKlara);
        this.ultimateArrayForSounds.set("insultsToDaisyFromFranzi", this.insultsToDaisyFromFranzi);
        this.ultimateArrayForSounds.set("insultsToDaisyFromNanni", this.insultsToDaisyFromNanni);
        this.ultimateArrayForSounds.set("insultsToDaisyFromKlara", this.insultsToDaisyFromKlara);
        this.ultimateArrayForSounds.set("insultsToKlaraFromDaisy", this.insultsToKlaraFromDaisy);
        this.ultimateArrayForSounds.set("insultsToKlaraFromFranzi", this.insultsToKlaraFromFranzi);
        this.ultimateArrayForSounds.set("insultsToKlaraFromNanni", this.insultsToKlaraFromNanni);
        this.ultimateArrayForSounds.set("insultsToFranziFromDaisy", this.insultsToFranziFromDaisy);
        this.ultimateArrayForSounds.set("insultsToFranziFromNanni", this.insultsToFranziFromNanni);
        this.ultimateArrayForSounds.set("insultsToFranziFromKlara", this.insultsToFranziFromKlara);
        this.ultimateArrayForSounds.set("generalInsultsDaisy", this.generalInsultsDaisy);
        this.ultimateArrayForSounds.set("generalInsultsFranzi", this.generalInsultsFranzi);
        this.ultimateArrayForSounds.set("generalInsultsNanni", this.generalInsultsNanni);
        this.ultimateArrayForSounds.set("generalInsultsKlara", this.generalInsultsKlara);
        this.ultimateArrayForSounds.set("generalDefensiveDaisy", this.generalDefensiveDaisy);
        this.ultimateArrayForSounds.set("generalDefensiveFranzi", this.generalDefensiveFranzi);
        this.ultimateArrayForSounds.set("generalDefensiveNanni", this.generalDefensiveNanni);
        this.ultimateArrayForSounds.set("generalDefensiveKlara", this.generalDefensiveKlara);
        this.ultimateArrayForSounds.set("exclamationDaisy", this.exclamationDaisy);
        this.ultimateArrayForSounds.set("exclamationFranzi", this.exclamationFranzi);
        this.ultimateArrayForSounds.set("exclamationNanni", this.exclamationNanni);
        this.ultimateArrayForSounds.set("exclamationKlara", this.exclamationKlara);
        this.ultimateArrayForSounds.set("baseAttackDaisy", this.baseAttackDaisy);
        this.ultimateArrayForSounds.set("baseAttackKlara", this.baseAttackKlara);
        this.ultimateArrayForSounds.set("boostedDMGDaisy", this.boostedDMGDaisy);
        this.ultimateArrayForSounds.set("spellOneDaisy", this.spellOneDaisy);
        this.ultimateArrayForSounds.set("spellOneNanni", this.spellOneNanni);
        this.ultimateArrayForSounds.set("spellOneKlara", this.spellOneKlara);
        this.ultimateArrayForSounds.set("spellTwoNanni", this.spellTwoNanni);
        this.ultimateArrayForSounds.set("spellThreeNanni", this.spellThreeNanni);

        console.log("created start screen");
        let scene = this.scene;

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'startLoadingBackground').setDepth(0);


            this.game.scene.start('StartScene', this.ultimateArrayForSounds); // Start the battle scene
            this.game.scene.stop('LoadingScene');


        console.log("playbutton pressed");

        // you have to check if an Button beneath was chosen


    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }


    addPlayer(i, anzahlPlayer, texture, scaleX, scaleY) {
        return this.add.image((i + 1) * (this.game.renderer.width / (anzahlPlayer + 1)), 4 * this.game.renderer.height / 5, texture).setScale(scaleX, scaleY);
    }

}