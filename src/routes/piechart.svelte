<div class="container"><canvas id="myChart"></canvas></div>
<ul>
	{#each $pangoapiversions as versions}
		<li>{versions}</li>
	{/each}
	</ul>
<script>
    import { writable, derived } from 'svelte/store';
    let pie = '';
    export const pversions = writable([]);
	export const pangoapiversions = derived(pversions, ($pversions) => {
        // console.log($pversions.map(state => state.state))
		if ($pversions.data) {
			// pie = $pversions.data.map(state => state.state)
            // console.log(pie)
			return $pversions.data.map(state => state.state);
		}
		return [];
	});

    export const count = derived(pversions, ($pversions) => {
        // console.log($pversions.data.map(state => state.state))
		if ($pversions.data) {
			pie = $pversions.data.map(count => count.count)
            console.log(pie)
			return $pversions.data.map(count => count.count);
		}
		return [];
	});
	// $pangoapiversions.split(":")
	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/statedata/`, {
			headers: { 'Content-Type': 'application/json' },
			// method: 'POST',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				pversions.set(data);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	});
    // let data = {};
    // for (let i=0; i<$pangoapiversions.length; i++){
    // for (const data2 in $pangoapiversions ) {
    const data = {
    // labels: [i],
    labels: [
    'Red',
    'Blue',
    'Yellow',
    'Red1',
    'Blue1',
    'Yellow1',
    'Red2',
    'Blue2',
    'Yellow2',
    'Blue3',
    'Yellow3',
    'Red4',
    'Blue4',
    'Yellow5'
  ],
    datasets: [{
        label: 'My First Dataset',
        // data: [$count],
        data: [300, 50, 100,300, 50, 100,300, 50, 100],
        backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 20, 8)',
        'rgb(255, 99, 2)',
        'rgb(2, 162, 35)',
        'rgb(25, 25, 86)',
        'rgb(25, 9, 12)',
        'rgb(54, 12, 25)',
        'rgb(255, 05, 6)',
        
        ],
        hoverOffset: 4
    }]
    };
// }
    import { onMount } from 'svelte';
        function create() {
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
                type: 'doughnut',
                data: data
            });
    }
onMount(create)
</script>

<style>
    .container {
        width: 500px;
        height: 500px;
    }
</style>