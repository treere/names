<script lang="ts">
  import { Info } from 'lucide-svelte';
</script>

<div class="max-w-2xl mx-auto space-y-6 py-6">
  <div class="text-center">
    <h1 class="text-3xl font-bold tracking-tight">Informazioni</h1>
  </div>

  <div class="p-6 rounded-lg bg-card border space-y-4">
    <div class="flex items-start gap-3">
      <Info class="w-5 h-5 mt-0.5 text-muted-foreground flex-shrink-0" />
      <p class="text-muted-foreground leading-relaxed">
        So che trovare il nome giusto può essere un po' un incubo, soprattutto quando hai in mente delle
        caratteristiche specifiche. Quindi, ho creato questo strumento per aiutarti a trovare il nome
        perfetto.
      </p>
    </div>
    <p class="text-muted-foreground leading-relaxed">
      Inserisci le tue preferenze e scopri i nomi che ti aspettano! Sia che tu stia cercando un
      nome per una persona o un personaggio, sono qui per aiutarti a trovare l'ispirazione giusta.
    </p>
  </div>

  <div class="p-6 rounded-lg bg-card border space-y-3">
    <h2 class="font-semibold">Come funziona</h2>
    <ul class="space-y-2 text-sm text-muted-foreground">
      <li class="flex items-start gap-2">
        <span class="text-primary font-medium">1.</span>
        <span>Inserisci i criteri di ricerca nel form sulla homepage</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-primary font-medium">2.</span>
        <span>Usa i filtri per cercare nomi che contengono, iniziano o finiscono con lettere specifiche</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-primary font-medium">3.</span>
        <span>Filtra per genere (maschile/femminile) e lunghezza del nome</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-primary font-medium">4.</span>
        <span>Clicca su un nome per vedere le statistiche ISTAT degli ultimi anni</span>
      </li>
    </ul>
  </div>

  <div class="p-6 rounded-lg bg-card border space-y-3">
    <h2 class="font-semibold">Fonti dei dati</h2>
    <p class="text-sm text-muted-foreground leading-relaxed">
      I dati sui nomi sono forniti da
      <a href="https://www.istat.it/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
        ISTAT
      </a>
      - Istituto Nazionale di Statistica. I dati rappresentano il numero di nati registrati in Italia
      con ciascun nome.
    </p>
  </div>
</div>
