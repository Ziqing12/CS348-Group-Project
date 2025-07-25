export interface PingBody {
    dr_num: number
}
export type SearchPayload = {
    dr_num?: string;
    date_occurred?: string;
    area_name?: string;
    sort_time?: string;
    sort_age?: string;
}
export type InsertPayload = {
    dr_num: number;
    date_reported: string;
    date_occurred: string;
    time_occurred: string;    
    area_code: number;
    area_name: string;
    crime_code: number;
    crime_description: string;
    victim_age: number;
    sex: string;
    race: string;
    weapon_code?: string | null;
    weapon_description?: string | null;
    latitude: number;
    longitude: number;
}
export type DeletePayload = {
    dr_num: string;
};
export type UpdatePayload = {
    dr_num: string;
    weapon_code: string; 
    weapon_description: string
};
