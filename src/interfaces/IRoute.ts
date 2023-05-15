export interface IRoute {
    id: number
    name: string
    center: [number, number]
    distance: number
    estimated_time: number
    segments: {
        instruction: string
        origin: [number, number]
        destination: [number, number]
        score: number
    }[]
    average_accessibility: number
}
