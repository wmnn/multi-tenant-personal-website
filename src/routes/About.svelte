<script lang="ts">
    import DownArrow from "./DownArrow.svelte";

    let iconSize = '32px'   
</script>

<section id="about" class="h-[100vh] flex flex-col justify-center gap-8">
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

    <div class={`max-h-[${iconSize}] flex justify-start gap-4 object-cover items-center`}>
        <img src="/projects/typescript.png" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/javascript.png" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/svelte.svg" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/react.svg" alt="" width={iconSize} height={iconSize}/>

        
        <img src="/projects/tailwind.png" alt="" width={iconSize} height={iconSize}/>

        <img src="/projects/mysql.png" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/mongo_db.jpeg" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/firebase.svg" alt="" width={iconSize} height={iconSize}/>
        <img src="/projects/github.svg" alt="" width={iconSize} height={iconSize}/>
    </div>

    


   <DownArrow href={`/#CV`}/>


</section>

<style>
    
</style>