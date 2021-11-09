<!-- <div class="columns">
<div class="box"><canvas id="myChart"></canvas></div>
<div class="box"><canvas id="myBarChart"></canvas></div></div> -->
<!-- {$pangoapiversions.data} -->
<div class="cloumns">
	<div class="column">
		<div class="box">
			<div class="columns mb-0">
                <div class="column-8">
					<div>
						<canvas id="myChart"></canvas>
					</div>
				</div>
                <div class="column-4">
					<div>
						<canvas id="myBarChart">
					</div>
				</div>
                </div>
                </div>
                </div></div>
<script>
    import { writable, derived } from 'svelte/store';
    let pie = '';
    export const pversions = writable([]);
	export const pangoapiversions = derived(pversions, ($pversions) => {
        // console.log($pversions.data.map(state => state.state))
		if ($pversions.data) {
			pie = $pversions.data.map(state => state.state)
            console.log(pie)
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
    // for (i = 0, len = $pangoapiversions.length, text = ""; i < len; i++) {
        
    // }
    // let map1 = $pversions.map(state => state.state)
    // console.log($pversions.map(state => state.state))
    // const map1 = $pversions.map(data => data.state);
    // console.log(map1)
    const data = {
    labels: pie,
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
    import { onMount } from 'svelte';
        function create() {
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
                type: 'doughnut',
                data: data
            });
    }
onMount(create)

    function createbarchart() {
        const ctx = document.getElementById('myBarChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}
onMount(createbarchart)
</script>

<style>
    #myBarChart {
        width: 500px;
        height: 500px;
    }
    /* #myChart {
        width: 500px;
        height: 500px;
    } */
    /* .box {
        width: 500px;
        height: 500px;
    } */
</style>