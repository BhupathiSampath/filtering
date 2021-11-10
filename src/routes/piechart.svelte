<div class="container"><canvas id="myChart"></canvas></div>
<div class="cloumns">
    <div class="column">
        
            
            <div class="columns is-centered mb-0">
                {#each $pangoapiversions as states}
                {#each $count as value}
                <article class="notification is-success mr-2 pt-2 has-text-centered">
                    <div class="column-2">
                        
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="lable">{states}</label>
                        
                        <div>
                            <p class="title">{value}</p>
                        </div>
                    </div>
                </article>
                {/each}
                {/each}
            </div>
    </div>
</div>
<script>
    import { writable, derived } from 'svelte/store';
    let pie = '';
    let pie1 = []
    let pie2 = []
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
            pie2 = $pversions.data.map(count => count.count)
			pie1 = $pversions.data.map(count => count.state)
            console.log(pie1, pie2)
            let z = []
            z.push(pie1)
            z.push(pie2)
			return z;
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
                // pie2 = pversions.data.map(count => count.count)
			    // pie1 = pversions.data.map(count => count.state)                
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
    labels: [],
//     labels: [
//     'Andaman and Nicobar Islands',
//     'Andhra Pradesh',
//     'Arunachal Pradesh',
//     'Assam',
//     'Bihar',
//     'Chandigarh',
//     'Chhattisgarh',
//     'Dadra and Nagar Haveli and Daman and Diu',
//     'Delhi',
//     'Goa',
//     'Gujarat',
//     'Haryana',
//     'Himachal Pradesh',
//     'Jammu and Kashmir',

//     'Jharkhand',
//     'Karnataka',
//     'Kerala',
//     'Ladakh',
//     'Madhya Pradesh',
//     'Maharashtra',
//     'Manipur',
//     'Meghalaya',
//     'Mizoram',
//     'Nagaland',
//     'Odisha',
//     'Puducherry',
//     'Punjab',
//     'Rajasthan',

//     'Sikkim',
//     'Tamil Nadu',
//     'Telangana',
//     'Tripura',
//     'Uttar Pradesh',
//     'Uttarakhand',
//     'West Bengal'
//   ],
    datasets: [{
        label: 'My First Dataset',
        data: [],
        // data: [72,93670,3587,38096, 5789, 9063,27744, 72, 130780,7093,79892,53004,28141,38249,12052,91290,25612,4241,32080,157115,56780,8276,48113,6526,49224,24384,72811,39738,18721,88179,137141,10766,36513,19410,158559],
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

        'rgb(55, 9, 132)',
        'rgb(54, 16, 235)',
        'rgb(25, 20, 8)',
        'rgb(25, 55, 2)',
        'rgb(2, 152, 35)',
        'rgb(255, 25, 86)',
        'rgb(25, 49, 12)',
        'rgb(544, 142, 25)',
        'rgb(255, 05, 6)',

        'rgb(45, 949, 132)',
        'rgb(64, 162, 35)',
        'rgb(255, 20, 8)',
        'rgb(258, 989, 2)',
        'rgb(2, 162, 35)',
        'rgb(25, 25, 86)',
        'rgb(250, 92, 102)',
        'rgb(540, 120, 205)',
        'rgb(15, 45, 60)',

        'rgb(256, 9, 12)',
        'rgb(254, 12, 235)',
        'rgb(255, 205, 8)',
        'rgb(55, 969, 2)',
        'rgb(92, 16, 35)',
        'rgb(125, 125, 86)',
        'rgb(215, 119, 12)',
        'rgb(514, 112, 215)',
        'rgb(25, 65, 96)',
        
        ],
        hoverOffset: 4
    }]
    };
// }
    import { onMount, tick } from 'svelte';
        async function create() {
            await tick();
            console.log(count)
            data.datasets[0].data.push(count[1])
            data.labels.push(count[0])
            console.log(data)
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