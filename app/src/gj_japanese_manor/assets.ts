export class Assets {
    public static readonly TILES_OVERWORLD_IMAGE = 'tilesOverworld';
    public static readonly TILES_OVERWORLD_MAP = 'tilesOverworldmap';

    public static url(...names: string[]): string {
        return './assets/' + names.join('/');
    }
}