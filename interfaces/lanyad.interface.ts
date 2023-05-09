export interface LanyadData {
    spotify: {
        track_id: string;
        timestamps: {
            start: number;
            end: number;
        };
        song: string;
        artist: string;
        album_art_url: string;
        album: string;
    },
    listening_to_spotify: boolean;
    kv: {
        [key: string]: string;
    }
    discord_user: {
        username: string;
        public_flags: number;
        id: string;
        global_name: string;
        display_name: string;
        discriminator: string;
        avatar: string;
        avatar_decoration: string;
        bot: boolean;
    },
    discord_status: 'online' | 'offline' | 'idle' | 'dnd' | 'streaming';
    activities: DiscordActivity[]
}

export interface DiscordActivity {
    type: number;
    timestamps: {
        start: number;
        end: number;
    };
    sync_id: string;
    session_id: string;
    state: string;
    name: string;
    party: {
        id: string;
        size: [number, number];
    };
    flags: number;
    id: string;
    details: string;
    created_at: number;
    assets: {
        small_text: string;
        small_image: string;
        large_text: string;
        large_image: string;
    };
    emoji?: {
        name?: string,
        id?: string,
        animated?: boolean,
    }
}

export type ActivityType = 'Coding' | 'Listening to Spotify' | 'Watching' | 'Playing' | 'Custom Status' | 'Competing' | 'Streaming' | 'Unknown';

export const PrirorityActivityType: ActivityType[] = ['Coding', 'Listening to Spotify', 'Playing', 'Streaming', 'Watching', 'Custom Status', 'Competing', 'Unknown'];

export interface Profile {
    discord: {
        id: string;
        username: string;
        discriminator: string;
        avatar?: string;
        avatar_url: string;
        banner?: string;
        banner_url?: string;
        accent_color?: string;
        avatar_decoration?: string;
        avatar_decoration_url?: string;
    }

    spotify?: {
        track_id: string;
        timestamps: {
            start: number;
            end: number;
        };
        song: string;
        artist: string;
        album_art_url: string;
        album: string;
    }
    activity: {
        name: ActivityType
        app: string;
        details: string;
        state: string;
        timestamps: {
            start: number;
            end: number;
        };
        assets: {
            small_text: string;
            small_image: string;
            large_text: string;
            large_image: string;
        };
    }
    kv: {
        [key: string]: string;
    }
    status: 'online' | 'offline' | 'idle' | 'dnd' | 'streaming';
    custom_status: {
        state: string;
        emoji: {
            name?: string;
            id?: string;
            animated?: boolean;
            emoji_url?: string;
        };
    };
    listening_to_spotify: boolean;
}