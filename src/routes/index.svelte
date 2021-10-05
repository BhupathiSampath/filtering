<script>
	import { writable, derived } from 'svelte/store';
	export const apiData = writable([]);
	export const apiData1 = writable([]);
	export const Data = derived(apiData, ($apiData) => {
		console.log($apiData);
		if ($apiData.results) {
			return $apiData.results;
		}
		return [];
	});
	let date = '',
		strain = '',
		lineage = '',
		mutation = '',
		reference_id = '',
		gene = '',
		amine_acid_position = '',
		search='',
		page = 1,
		prev = '',
		next = ''
	async function submit(page) {
		if (page>1) {
			prev = page-1;
		};
		if (page<($apiData.count)) {
			next = page+1;
		};
		const res = await fetch(
			`${import.meta.env.VITE_BASE_URL}/api/data1/?date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amine_acid_position=${amine_acid_position}&search=${search}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		)
			.then((res) => res.json())
			.then((results) => {
				console.log(results);
				apiData.set(results);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	}

	export const Data1 = derived(apiData1, ($apiData1) => {
	  console.log($apiData1)
	  if ($apiData1.path){
	    // return $apiData.data1.map(strain => strain.strain);
	    return $apiData.path;
	  }
	  return [];
	  });

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/data1/`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				apiData.set(data);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	});
	import { onMount } from 'svelte';

	let file;

	function upload() {
		const dataArray = new FormData();
		dataArray.append('file', file[0]);
		const submit = fetch(`${import.meta.env.VITE_BASE_URL}/api/adddata/`, {
			method: 'POST',
			body: dataArray
		})
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}


	async function download() {
		const res = await fetch(
			`${import.meta.env.VITE_BASE_URL}/api/exportcsv/?date=${date}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amine_acid_position=${amine_acid_position}&search=${search}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		)
			.then((res) => res.json())
			.then((path) => {
				console.log(path);
				apiData1.set(path);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	}

</script>

<!-- <p>total_pages:{($apiData.count / 100 + 1) ^ 0}</p> -->
<!-- {#each {length: ((($apiData.count)/100)+1)} as _, i}
    <li>{i + 1}</li>
{/each} -->
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
	<title>User Data</title>
</head>
<div class="cloumns">
	<div class="column">
		<div class="box" style="background-color: lightblue;">
			<form>
				<div class="columns is-centered mb-0">
					<div class="column">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="lable">Upload MAf file:</label>
						<input type="file" bind:files={file} name="file" required="required" />
						<button class="button is-link" type="submit" on:click|preventDefault={upload}
							>Upload</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="cloumns">
	<div class="column">
		<div class="box" style="background-color: lightblue;">
			<div class="columns is-centered mb-0">
				<div class="column-4" hidden>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="lable">Page:</label>
                        <div>
						    <input bind:value={page} type="text" name="strain" />
                        </div>
					</div>
				<div class="column-2" hidden>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">DATE:</label>
					<div>
						<input bind:value={date} type="text" name="date" />
					</div>
				</div> 
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">STRAIN:</label>
					<div>
						<input bind:value={strain} type="text" name="strain" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">LINEAGE:</label>
					<div>
						<input bind:value={lineage} type="text" name="lineage" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">GENE:</label>
					<div>
						<input bind:value={gene} type="text" name="gene" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">REFERENCE:</label>
					<div>
						<input bind:value={reference_id} type="text" name="reference_id" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">AA POSITION:</label>
					<div>
						<input bind:value={amine_acid_position} type="text" name="amine_acid_position" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">MUTATION:</label>
					<div>
						<input bind:value={mutation} type="text" name="mutation" />
					</div>
				</div>
				<div class="column-2" hidden>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">SEARCH BY KEY WORD:</label>
					<div>
						<input bind:value={search} type="text" name="search" />
					</div>
				</div>
			</div><br>
			<div class="columns is-centered mb-0">
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">DATE:</label>
					<div>
						<input bind:value={date} type="text"/>
						<!-- <input name=x size=10 maxlength=10  onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"> -->
					</div>
				</div> 
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">SEARCH BY KEY WORD:</label>
					<div>
						<input bind:value={search} type="text" name="search" />
					</div>
				</div>
			<div class="column-6">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="lable">...</label>
				<div>
					<input type="button" on:click={submit(page)} value="Get Data" />
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
<div class="box">
	<div>
	<button on:click={download}>Download</button>
	<div class="column">
		<!-- <section class="hero"> -->
		<!-- <div class="hero-body"> -->
		<p class="has-text-info">TOTAL RECORDS = {$apiData.count}</p>
		<div class="table-container is-filterable">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
				<thead id="head" class="has-text-centered">
					<tr>
						<th rowspan="2">ID</th>
						<th rowspan="2">DATE</th>
						<th rowspan="2">STRAIN</th>
						<th rowspan="2">LINEAGE</th>
						<th rowspan="2">GENE</th>
						<th rowspan="2">REFERENCE</th>
						<th rowspan="2">AA POSITION</th>
						<th rowspan="2">MUTATION</th>
					</tr>
				</thead>
				<tbody class="has-text-centered">
					<!-- {#if submit} -->
					{#each $Data as data}
						<tr>
							<th scope="row">{data.id}</th>
							<td>{data.date}</td>
							<td>{data.strain}</td>
							<td>{data.lineage}</td>
							<td>{data.gene}</td>
							<td>{data.reference_id}</td>
							<td>{data.amine_acid_position}</td>
							<td>{data.mutation}</td>
						</tr>
					{/each}
					</tbody>
			</table>
		</div>
	</div>
</div>

<nav class="pagination is-centered" role="navigation" aria-label="pagination">
	<ul class="pagination-list">
		{#if page>1}
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=prev)}>
			Prev page
		</li>
		{/if} 
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=1)}>
			First page
		</li> 
		<!-- {#each {length: prev} as _, i}
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=(i+1))}>
			{i+1}
		</li>
		{/each} -->
		{#if page>=1 && page<(($apiData.count / 100 + 1) ^ 0)}
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=page+1)}>
			Next page
		</li>
		 {/if}
	</ul>
</nav>
{page}
<!-- <div class="has-text-centered">
	<div class="column-2"> -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<!-- <label class="lable">Search page from 1 to {($apiData.count / 100 + 1) ^ 0 }:</label>
		<div>
			<input bind:value={page} type="number" name="page" />
			<input type="button" value="Get" on:click={submit(page)}>
		</div>
	</div>
</div> -->
<!-- <br> -->
<!-- <footer class="footer">
	<div class="content has-text-centered">
	  <p>
		<strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
		<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
		is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
	  </p>
	</div>
  </footer> -->
<!-- <nav class="pagination is-centered" role="navigation" aria-label="pagination">
	<ul class="pagination-list">
		
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=prev)}>
			Prev page
		</li>
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=1)}>
			First page
		</li>
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=page+1)}>
			next page
		</li>
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=($apiData.count / 100 + 1) ^ 0)}>
			Last page
		</li>
		{#each { length: ($apiData.count / 100 + 1) ^ 0 } as _, i}
		<li class="pagination-link" aria-label="Goto page" data-color="black" on:click={submit(page=(i + 2))}>
			{i+2}
		</li>
		{/each}
	</ul>
</nav> -->
