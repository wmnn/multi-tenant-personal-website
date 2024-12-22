import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'
import { getKeyValueStore, getUserStore } from '$lib/server/singleton.js';
import { KEYS } from '$lib/client/KEYS.js';
import type { CVData } from '$lib/server/db/CVManager';

/** @type {import('./$types').Actions} */
export const actions = {
	defaultValues: async (event) => {
    
        const formData = await event.request.formData();
        // const email: string = formData.get('email') as string ?? '';
        // const password: string = formData.get('password') as string ?? '';

        const email = ADMIN_EMAIL
        const password = ADMIN_PASSWORD

        await getKeyValueStore().set(KEYS.title, 'Peter Würdemann');
        const isUserCreated = await getUserStore().createUser(email, password);
        await getKeyValueStore().set(KEYS.about, DEFAULT_ABOUT_SECTION);
        await getKeyValueStore().set(KEYS.workexperience, JSON.stringify(DEFAULT_CV_DATA.workExperiences));    
        await getKeyValueStore().set(KEYS.education, JSON.stringify(DEFAULT_CV_DATA.education));   
        
        return { status: 200 };

	},
	customValues: async (event) => {

        const formData = await event.request.formData();
		const title: string = formData.get('title') as string ?? '';
		const email: string = formData.get('email') as string ?? '';
        const password: string = formData.get('password') as string ?? '';
        const about: string = formData.get('about') as string ?? '';
        const workExperiences: string = formData.get('workexperiences') as string ?? '';
        const education: string = formData.get('education') as string ?? '';
        
        await getKeyValueStore().set(KEYS.title, title);
        const isUserCreated = await getUserStore().createUser(email, password);
        await getKeyValueStore().set(KEYS.about, about);
        await getKeyValueStore().set(KEYS.workexperience, workExperiences);  
        
        return { status: 200 };

    }
    
};

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
  