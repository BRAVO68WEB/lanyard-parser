import { LanyadData, PrirorityActivityType, Profile } from '../interfaces/lanyad.interface';
import fetch from './fetch';
import fs from 'fs';

export default async function parse(id: string) {
    console.log('Parsing...');
    const data: LanyadData = await fetch(id);

    fs.writeFileSync('lanyard' + '.json', JSON.stringify(data, null, 4));

    const output : Profile = {} as Profile;

    output.discord = {
        id: data.discord_user.id,
        username: data.discord_user.username,
        discriminator: data.discord_user.discriminator,
        avatar_url: "https://cdn.discordapp.com/avatars/" + data.discord_user.id + "/" + data.discord_user.avatar + ".png",
        avatar_decoration_url: "https://cdn.discordapp.com/avatar-decoration-presets/" + data.discord_user.avatar_decoration + ".png"
    }

    output.kv = data.kv;

    if (data.listening_to_spotify) {
        output.spotify = {
            album: data.spotify.album,
            artist: data.spotify.artist,
            song: data.spotify.song,
            album_art_url: data.spotify.album_art_url,
            timestamps: data.spotify.timestamps,
            track_id: data.spotify.track_id
        }
    }
    const act : any[] = [];
    for(const activity of data.activities) {
        if(activity.name.includes("Visual Studio Code")){
            act.push({
                prirority_id: PrirorityActivityType.indexOf('Coding'),
                ...activity
            });
        }
        else if(activity.name.includes("Spotify")){
            act.push({
                prirority_id: PrirorityActivityType.indexOf('Listening to Spotify'),
                ...activity
            });
        }
        else if(activity.name.includes("Custom Status")){
            act.push({
                prirority_id: PrirorityActivityType.indexOf('Custom Status'),
                ...activity
            });
            output.custom_status = {
                state: activity.state,
                emoji: {
                    name: activity.emoji?.name,
                    id: activity.emoji?.id,
                    animated: activity.emoji?.animated,
                    emoji_url: "https://cdn.discordapp.com/emojis/" + activity.emoji?.id + ".webp?size=44&quality=lossless"
                }

            };
        }
        else {
            act.push({
                prirority_id: PrirorityActivityType.indexOf('Unknown'),
                ...activity
            });
            break;
        }
    }

    act.sort((a, b) => a.prirority_id - b.prirority_id);

    output.activity = act[0];

    fs.writeFileSync('profile' + '.json', JSON.stringify(output, null, 4));
    console.log('Parsed!');
}