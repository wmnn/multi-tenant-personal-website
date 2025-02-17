import { KEYS } from "$lib/client/KEYVALUESTORE_KEYS.js";
import type { CVData } from "$lib/server/db/CVManager.js";
import { getAuthManager, getKeyValueStore, getUserStore } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";
import { v1 as uuidv1 } from 'uuid';

/** @type {import('./$types').RequestHandler} */
/**
 * Batch update key value store, or set default values
 * @param event 
 * @returns 
 */
export async function PUT(event) {

    if (!await getAuthManager().isAccessTokenValid(event)) {
        return json({
            status: 401
        })
    }
    const body = await event.request.json()

    const action = body.action
    const pageName = uuidv1();
    let isSuccess = true;

    if (action == 'batch') {

        // Handling user
        if (Object.keys(body.data).includes('email') && Object.keys(body.data).includes('password')) {
            isSuccess = await getUserStore().createUser(body.data.email, pageName, body.data.password);
        }

        for (const [key, value] of Object.entries(body.data)) {
            if (!Object.keys(KEYS).includes(key)) {
                continue;
            }
            
            if (typeof value === 'object' && value !== null) {
                await getKeyValueStore().set(pageName, key, JSON.stringify(value));    
            } else {
                await getKeyValueStore().set(pageName, key, value as string);
            }
            
        }

    } else if (action == 'default') {
        
        const email = 'abc'
        const password: string = '123456'
        isSuccess = await getUserStore().createUser(email, pageName, password);
        await getKeyValueStore().set(pageName, KEYS.about, DEFAULT_ABOUT_SECTION);
        await getKeyValueStore().set(pageName, KEYS.workexperience, JSON.stringify(DEFAULT_CV_DATA.workExperiences));    
        await getKeyValueStore().set(pageName, KEYS.education, JSON.stringify(DEFAULT_CV_DATA.education));           

    }

    if (isSuccess) {
        const redirectUrl = `https://${pageName}.${getDomain(event)}`;
        return json({
            status: 200,
            href: redirectUrl
        })
    } else {
        return json({
            status: 400
        })
    }    
    
}


function getDomain(event: RequestEvent): string {
    const host = event.url.host; // e.g., "sub.example.com"
    const parts = host.split('.'); 

    // If it's an IPv4 or localhost, return as-is
    if (parts.length <= 2 || /^[0-9.]+$/.test(host) || host === 'localhost') {
        return host;
    }

    return parts.slice(-2).join('.'); // Get only "example.com"
}


const DEFAULT_ABOUT_SECTION = `
    <h1 class="inline-block text-4xl">Hallo !</h1>
    
    <span class="text-xl">
        Ich bin ein Webentwickler, welcher es liebt Nutzerschnittstellen zu erstellen und mit Daten zu arbeiten.<br>
        <br>

        <blockquote>
            <i>
                Anything that can be Written in JavaScript, will Eventually be Written in JavaScript - Atwood's Law
            </i>
            
        </blockquote> 

        <br>

        In meiner Freizeit spiele ich Fußball, beschäftige mich im Fitnessstudio oder gehe gerne Essen.
    
    </span>

    <div class="max-h-[32px] flex justify-start gap-4 object-cover items-center">
        <img src="/projects/typescript.png" alt="" width='32px' height='32px'/>
        <img src="/projects/javascript.png" alt="" width='32px' height='32px'/>
        <img src="/projects/svelte.svg" alt="" width='32px' height='32px'/>
        <img src="/projects/react.svg" alt="" width='32px' height='32px'/>

        
        <img src="/projects/tailwind.png" alt="" width='32px' height='32px'/>

        <img src="/projects/mysql.png" alt="" width='32px' height='32px'/>
        <img src="/projects/mongo_db.jpeg" alt="" width='32px' height='32px'/>
        <img src="/projects/firebase.svg" alt="" width='32px' height='32px'/>
        <img src="/projects/github.svg" alt="" width='32px' height='32px'/>
    </div>
    
`
    
const DEFAULT_CV_DATA: CVData = {
    workExperiences: [
        {
            what: 'Software Developer Work Study',
            start: new Date('Oct 2023 1'),
            end: new Date('Mar 2024 31'),
            where: 'Fan12 GmbH & Co. KG',
            experience: ` • Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich\n • Sammeln (Scraping) und Aufbereiten von Daten von über 60 verschiedenen Webseiten. Sowie die Bereitstellung der Daten, in Form von Google Sheets Tabellen, durch die Google Cloud API.`
        },
        {
            what: 'Software Developer Internship',
            start: new Date('Aug 2023 1'),
            end: new Date('Sep 2023 30'),
            where: 'Fan12 GmbH & Co. KG',
            experience: ` • Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich\n • Erstellung eines Programms, welches nach Empfang von neuen Emails, über das Netzwerk auf dem Zieldrucker das angehängte Dokument ausdruckt. Dabei wird in der Email der Zieldrucker spezifiziert.`
        }

    ],
    education: [
        {
            what: 'Bachelor of Science in Computer Science',
            start: new Date('Oct 2022 1'),
            where: 'University Oldenburg',
            experience: ` • Analysis für Informatiker 1.0\n • Softwareprojekt 1.0`
        }
    ]
}
  