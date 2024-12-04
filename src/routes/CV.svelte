<script>

    import DownArrow from "./DownArrow.svelte";

</script>
<section id="CV" class="h-[100vh] flex flex-col justify-center">
    
    <h1 class="text-4xl my-16">Lebenslauf</h1>

    <h3 class="text-reallylight">Work Experience</h3>

    <ul class="list-disc my-4">
        <h3>Software Developer Work Study at Fan12 GmbH & Co. KG</h3>
        <p class="text-reallylight">Oct 2023 - Mar 2024 (6 mos)</p>
        <li>Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich</li>
        <li>Sammeln (Scraping) und Aufbereiten von Daten von über 60 verschiedenen Webseiten. Sowie die Bereitstellung der Daten, in Form von Google Sheets Tabellen, durch die Google Cloud API.</li>
    </ul>

    <ul class="list-disc my-4">
        <h3 class="">Software Developer Internship at Fan12 GmbH & Co. KG</h3>
        <p class="text-reallylight">Aug 2023 - Oct 2023 (2 mos)</p>
        <li>Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich</li>
        <li>Erstellung eines Programms, welches nach Empfang von neuen Emails, über das Netzwerk auf dem Zieldrucker das angehängte Dokument ausdruckt. Dabei wird in der Email der Zieldrucker spezifiziert.</li>
    </ul>


    <h3 class="text-reallylight mt-8">Education</h3>


    <ul class="list-disc my-4">
        <h3 class="">Bachelor of Science in Computer Science at University Oldenburg</h3>
        <p class="text-reallylight">Oct 2022 - Now</p>
        <li>Analysis für Informatiker 1.0</li>
        <li>Softwareprojekt 1.0</li>
    </ul>

    <DownArrow href={`/#projects`}/>
    
</section>

<style>
    li {
        margin-left: 20px;
    }
</style>