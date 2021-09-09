export default interface IAssetsData {
    id: number,
    name: string,
    model: string,
    image: string,
    specifications: {
        maxTemp?: number | null,
        power?: number | null,
        rpm?: number | null,
    },
    metrics: {
        lastUptimeAt: string | null, 
        totalCollectsUptime: number | null, 
        totalUptime: number | null, 
    },
    sensors: string[],
    companyId: number,
    unitId: number,
    healthscore: number,
    status: string
}