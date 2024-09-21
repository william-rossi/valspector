export class Helper {
    static getSeasonFormatted(season: string | undefined) {
        if (!season)
            return ""

        let episode = season[1]
        const act = season[season.length - 1]

        if (/^-?\d+$/.test(season[2]))
            episode = episode + season[2]

        return `Episode ${episode} Act ${act}`
    }
}