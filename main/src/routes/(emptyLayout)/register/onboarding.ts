import { request } from "$lib/client/auth";
import type { CVData } from "$lib/server/db/CVManager";
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
                email: mail,
                password: psswrd,
                about: abt,
                workexperience: wrkExp,
                education: educationn
            })
        });
       
        if (res.status == 200) {
            window.location.href = res.href
        }

    } catch (error) {
        console.error('Error during form submission:', error);
    }
}

export const DEFAULT_CV_DATA: CVData = {
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
  
export const DEFAULT_ABOUT_SECTION = `
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
