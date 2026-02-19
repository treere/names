<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import fetchJsonp from 'fetch-jsonp';
  import { TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-svelte';

  const { gender, name } = page.params;

  type IstatData = {
    year: number;
    count: number;
    percent: number;
  };

  const loadIstatData = async (name: string, gender: string): Promise<IstatData[]> => {
    const lowerName = name.toLowerCase();
    const now = Date.now();
    const genderSymbol = gender === 'male' ? 'm' : 'f';

    const response = await fetchJsonp(
      `https://www.istat.it/wp-content/themes/EGPbs5-child/contanomi/nati/index2022.php?callback=callback&type=name&name=${lowerName}&gender=${genderSymbol}&originalName=${lowerName}&_=${now}`,
      { jsonpCallbackFunction: 'callback' }
    );
    const istatResponse = await response.json();

    return Object.keys(istatResponse)
      .filter((x) => x !== 'years')
      .flatMap((x) => istatResponse[x])
      .map((x) => ({ year: x.year, count: x.count, percent: x.percent }))
      .sort((a, b) => a.year - b.year);
  };

  const istat = loadIstatData(name, gender);

  const getStats = (data: IstatData[]) => {
    if (!data.length) return null;
    const counts = data.map((d) => d.count);
    const max = Math.max(...counts);
    const min = Math.min(...counts);
    const maxYear = data.find((d) => d.count === max)?.year;
    const minYear = data.find((d) => d.count === min)?.year;
    const first = counts[0];
    const last = counts[counts.length - 1];
    const trend = last > first ? 'up' : last < first ? 'down' : 'stable';
    const change = first > 0 ? ((last - first) / first) * 100 : 0;
    return { max, min, maxYear, minYear, trend, change, first, last };
  };
</script>

<div class="space-y-6">
  <div class="py-4 relative">
    <button onclick={() => history.back()} class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 p-2 hover:bg-muted rounded-full">
      <ArrowLeft class="w-5 h-5" />
      <span class="text-sm hidden sm:inline">indietro</span>
    </button>
    <div class="text-center">
      <h1 class="text-3xl font-bold capitalize tracking-tight">{name}</h1>
      <p class="text-muted-foreground mt-1 capitalize">{gender === 'male' ? 'Maschio' : 'Femmina'}</p>
    </div>
  </div>

  {#await istat}
    <div class="flex justify-center py-12">
      <p class="text-muted-foreground">Caricamento dati...</p>
    </div>
  {:then data}
    {#if data.length === 0}
      <p class="text-center text-muted-foreground py-8">Nessun dato disponibile</p>
    {:else}
      {@const stats = getStats(data)}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-lg bg-card border">
          <p class="text-sm text-muted-foreground">Massimo</p>
          <p class="text-2xl font-bold">{stats?.max.toLocaleString()}</p>
          <p class="text-xs text-muted-foreground">{stats?.maxYear}</p>
        </div>
        <div class="p-4 rounded-lg bg-card border">
          <p class="text-sm text-muted-foreground">Minimo</p>
          <p class="text-2xl font-bold">{stats?.min.toLocaleString()}</p>
          <p class="text-xs text-muted-foreground">{stats?.minYear}</p>
        </div>
        <div class="p-4 rounded-lg bg-card border">
          <p class="text-sm text-muted-foreground">Primo anno</p>
          <p class="text-2xl font-bold">{data[0]?.year}</p>
          <p class="text-xs text-muted-foreground">{data[0]?.count.toLocaleString()} nati</p>
        </div>
        <div class="p-4 rounded-lg bg-card border">
          <p class="text-sm text-muted-foreground">Ultimo anno</p>
          <p class="text-2xl font-bold">{data[data.length - 1]?.year}</p>
          <p class="text-xs text-muted-foreground">{data[data.length - 1]?.count.toLocaleString()} nati</p>
        </div>
      </div>

      <div class="p-4 rounded-lg bg-card border">
        <div class="flex items-center gap-2 mb-4">
          {#if stats?.trend === 'up'}
            <TrendingUp class="w-5 h-5 text-green-500" />
            <span class="text-green-500 font-medium">In crescita</span>
          {:else if stats?.trend === 'down'}
            <TrendingDown class="w-5 h-5 text-red-500" />
            <span class="text-red-500 font-medium">In calo</span>
          {:else}
            <Minus class="w-5 h-5 text-muted-foreground" />
            <span class="text-muted-foreground font-medium">Stabile</span>
          {/if}
          {#if stats && Math.abs(stats.change) > 0}
            <span class="text-sm text-muted-foreground">
              ({stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)}% dal {data[0]?.year} al {data[data.length - 1]?.year})
            </span>
          {/if}
        </div>

        <div class="w-full h-64">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              points={data.map((d, i) => {
                const max = Math.max(...data.map(x => x.count));
                const min = Math.min(...data.map(x => x.count));
                const range = max - min || 1;
                const w = data.length > 1 ? 100 / (data.length - 1) : 0;
                return `${i * w},${100 - ((d.count - min) / range) * 90 - 5}`;
              }).join(' ')}
              class="text-primary"
            />
            <polyline
              fill="url(#gradient)"
              stroke="none"
              points={`0,100 ${data.map((d, i) => {
                const max = Math.max(...data.map(x => x.count));
                const min = Math.min(...data.map(x => x.count));
                const range = max - min || 1;
                const w = data.length > 1 ? 100 / (data.length - 1) : 0;
                return `${i * w},${100 - ((d.count - min) / range) * 90 - 5}`;
              }).join(' ')} 100,100`}
              opacity="0.2"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="currentColor" class="text-primary" />
                <stop offset="100%" stop-color="currentColor" class="text-primary" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{data[0]?.year}</span>
          <span>{data[data.length - 1]?.year}</span>
        </div>
      </div>

      <div class="rounded-lg bg-card border overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-muted/50">
            <tr>
              <th class="px-4 py-2 text-left font-medium">Anno</th>
              <th class="px-4 py-2 text-right font-medium">Nati</th>
              <th class="px-4 py-2 text-right font-medium">Percentuale</th>
            </tr>
          </thead>
          <tbody>
            {#each data as item}
              <tr class="border-t">
                <td class="px-4 py-2">{item.year}</td>
                <td class="px-4 py-2 text-right">{item.count.toLocaleString()}</td>
                <td class="px-4 py-2 text-right">{item.percent.toFixed(4)}%</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {:catch error}
    <p class="text-center text-muted-foreground py-8">Probabilmente non ci sono dati nel database ISTAT per questo nome</p>
  {/await}
</div>
