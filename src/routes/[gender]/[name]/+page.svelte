<script lang="ts">
  import { page } from '$app/state';
  import fetchJsonp from 'fetch-jsonp';

  const { gender, name } = page.params;

  type IstatResponse = {
    year: number;
    count: number;
    percent: number;
  }[];

  const loadIstatData = async (name: string, gender: string): Promise<IstatResponse> => {
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
      .map((x) => ({ year: x.year, count: x.count, percent: x.percent }));
  };

  const istat = loadIstatData(name, gender);
</script>

<h1 class="text-2xl capitalize">{name}</h1>

{#await istat}
  Loading...
{:then data}
  <pre>{JSON.stringify(data, null, 2)}</pre>
{:catch}
  Error
{/await}
