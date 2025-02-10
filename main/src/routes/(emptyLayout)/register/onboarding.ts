import { request } from "$lib/client/auth";
import type { CVDataEntry } from "$lib/server/types";
import { writable, type Writable } from "svelte/store";

export const email = writable('');
export const password = writable('');
export const firstName = writable('');
export const lastName = writable('');
export const position = writable(0);

export const workExperiences: Writable<CVDataEntry[]> = writable([]);
export const education: Writable<CVDataEntry[]> = writable([]);
export const about = writable('');


export async function handleSubmitDefault() {
    const res = await request('/api/keyvaluestore', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'default',
        })
    });

    if (res.status == 200) {
        window.location.href = res.href
    }

}

export async function handleSubmit() {

    const mail: any = await new Promise(resolve => email.subscribe(val => resolve(val)))
    const psswrd: any = await new Promise(resolve => password.subscribe(val => resolve(val)))
    const abt: any = await new Promise(resolve => about.subscribe(val => resolve(val)))
    const wrkExp: any = await new Promise(resolve => workExperiences.subscribe(val => resolve(val)))
    const educationn: any = await new Promise(resolve => education.subscribe(val => resolve(val)))

    // Send the request using a custom 'request' function or fetch
    try {
        const res = await request('/api/keyvaluestore', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'batch',
                data: {
                    email: mail,
                    password: psswrd,
                    about: abt,
                    workexperience: wrkExp,
                    education: educationn
                }
            })
        });
       
        if (res.status == 200) {
            window.location.href = res.href
        }

    } catch (error) {
        console.error('Error during form submission:', error);
    }
}