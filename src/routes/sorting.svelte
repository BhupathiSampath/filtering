<script>
	import MultiSelect from './sorting.svelte';
	import {download} from '@tadashi/fd'
	import DateRangeSelect from 'svelte-date-range-select';
	import { writable, derived } from 'svelte/store';
	export let apiData = writable([]);
	export const apiData1 = writable([]);
	export const Data = derived(apiData, ($apiData) => {
		// console.log($apiData);
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
		search = '',
		page = 1,
		prev = '',
		start_date = '',
		end_date = '',
		days = 36500,
		next = '',
		ordering = '';
	const name = 'createdDate';
	const heading = 'Created Date';
	// this limits the HTML5 date picker end date - e.g. today is used here
	let endDateMax = new Date();
	// this limits the HTML5 date picker's start date - e.g. 3 years is select here
	let startDateMin = new Date(
		new Date().setFullYear(endDateMax.getFullYear(), endDateMax.getMonth() - 36)
	);

	// console.log(handleApplyDateRange.endDateMax)
	// option to override the defaults - change to other language, below are the default values
	const labels = {
		notSet: 'not set',
		greaterThan: 'greater than',
		lessThan: 'less than',
		range: 'range',
		day: 'day',
		days: 'days',
		apply: 'ok'
	};

	// form post ids
	const startDateId = 'start_date_id';
	const endDateId = 'end_date_id';

	// executed when the user selects the range by clicking the apply button (with the fa-check icon)
	function handleApplyDateRange(data) {
		console.log(data.detail.startDate);
		start_date = data.detail.startDate;
		end_date = data.detail.endDate;
		console.log(start_date, end_date);
		submit(page);
		// e.g. will return an object
		// {
		//  startDate: 2000-12-01,
		//  endDate: 2020-04-06,
		//  name: createdDate
		// }
	}

	
	async function submit(page) {
		if (page > 1) {
			prev = page-1
		}
		const res = await fetch(
			`http://10.10.6.87/api/data1/?ordering=${ordering}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amine_acid_position=${amine_acid_position}&search=${search}`,
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
	//   console.log($apiData1)
	  if ($apiData1.path){
	    // return $apiData.data1.map(strain => strain.strain);
	    return $apiData.path;
	  }
	  return [];
	  });

	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/data1/?days=${days}`, {
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
		const submit = fetch(`http://10.10.6.87/api/adddata/?days=${days}`, {
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


	async function get_download_link() {
		const res = await fetch(
			`http://10.10.6.87/api/exportcsv/?ordering=${ordering}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amine_acid_position=${amine_acid_position}&search=${search}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		)
			.then((res) => res.json())
			.then((data) => {
				let file_name = data.path.split('/').at(-1)
				let download_path = `http://10.10.6.87/download/${file_name}`
				// console.log(download_path)
				getFile(download_path, file_name)
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	}
	async function getFile(url, filename) {
		const response = await fetch(url)
		await download(response, filename)
	}

</script>

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
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">STRAIN:</label> -->
					<div>
						<input bind:value={strain} type="text" name="strain" placeholder="Strain" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">LINEAGE:</label> -->
					<div>
						<input bind:value={lineage} type="text" name="lineage" placeholder="Lineage" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">GENE:</label> -->
					<div>
						<input bind:value={gene} type="text" name="gene" placeholder="Gene" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">REFERENCE:</label> -->
					<div>
						<input
							bind:value={reference_id}
							type="text"
							name="reference_id"
							placeholder="Reference"
						/>
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">AA POSITION:</label> -->
					<div>
						<input
							bind:value={amine_acid_position}
							type="text"
							name="amine_acid_position"
							placeholder="AA Position"
						/>
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">MUTATION:</label> -->
					<div>
						<input bind:value={mutation} type="text" name="mutation" placeholder="Mutation" />
					</div>
				</div>
			</div>
			<br />
			<div class="columns is-centered mb-0">
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">DATE:</label> -->
					<div>
						<input bind:value={date} type="text" placeholder="yyyy-mm-dd" />
						<!-- <input name=x size=10 maxlength=10  onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"> -->
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">SEARCH BY KEY WORD:</label> -->
					<div>
						<input bind:value={search} type="text" name="search" placeholder="Search by key word" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">From Date:</label> -->
					<div>
						<input
							bind:value={start_date}
							type="text"
							placeholder="yyyy-mm-dd(from)"
							name="start_date"
						/>
						<!-- <input name=x size=10 maxlength=10  onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"> -->
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">To Date:</label> -->
					<div>
						<input bind:value={end_date} type="text" placeholder="yyyy-mm-dd(to)" name="end_date" />
						<!-- <input name=x size=10 maxlength=10  onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"> -->
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->

					<div>
						<label class="lable">Recent Data:</label>
						<select id="days" bind:value={days} name="days">
							<option value="36500">All data</option>
							<option value="7">Last week</option>
							<option value="14">Last 2week</option>
							<option value="21">Last 3week</option>
							<option value="30">Last month</option>
							<option value="60">Last 2month</option>
							<option value="90">Last 3month</option>
							<option value="120">Last 4month</option>
							<option value="150">Last 5month</option>
							<option value="182">Last 6months</option>
							<option value="365">This year</option>
							<!-- <option value="custom">Custom</option> -->
						</select>
						<!-- <input bind:value={days} type="text" class="hide" placeholder="Custom Selector" name="custom" id="customInput"> -->
					</div>
				</div>
				<div class="column-6">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">...</label> -->
					<div>
						<input type="button" on:click={submit(page)} value="Get Data" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="columns is-centered is-offset-4 mt-0 pt-0">
		<div class="column-2">
			<!-- <div class="column-2"> -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- <label class="lable">To Date:</label> -->
			<div>
				<DateRangeSelect
					{startDateMin}
					{endDateMax}
					{name}
					{heading}
					{labels}
					{startDateId}
					{endDateId}
					on:onApplyDateRange={handleApplyDateRange}
				/>
			</div>
			<!-- </div> -->
		</div>
	</div>
</div>
<div class="box">
	<div class="container has-text-right">
		Export data to csv: <button on:click={get_download_link}>Export</button>
	</div>
	<div class="column">
		<!-- <section class="hero"> -->
		<!-- <div class="hero-body"> -->
		<p class="has-text-success">TOTAL RECORDS = {$apiData.count}</p>
		<div class="table-container sortable">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
				<thead id="head" class="has-text-centered is-sortable">
					<tr>
						<th rowspan="2" on:click={submit}>ID</th>
						<th rowspan="2">DATE</th>
						<th rowspan="2" on:click={submit(page)} value={(ordering = '-string')}>STRAIN</th>
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
<!-- {#if page>1}
<div class="container has-text-centered">{page} out of {($apiData.count / 100 + 1) ^ 0 } pages</div>
{/if} -->
{#if page > 1}
	<div class="container has-text-centered">
		{prev + 1} out of {($apiData.count / 100 + 1) ^ 0} pages
	</div>
{:else}
	<div class="container has-text-centered">
		{page} out of {($apiData.count / 100 + 1) ^ 0} pages
	</div>
{/if}
<nav class="pagination is-centered" role="navigation" aria-label="pagination">
	<ul class="pagination-list">
		{#if page > 1}
			<li
				class="pagination-link"
				aria-label="Goto page"
				data-color="black"
				on:click={submit((page = prev))}
			>
				Prev page
			</li>
			<li
				class="pagination-link"
				aria-label="Goto page"
				data-color="black"
				on:click={submit((page = 1))}
			>
				1
			</li>
			<li>....</li>
		{/if}
		{#if page > 1}
			<li
				class="pagination-link"
				aria-label="Goto page"
				data-color="black"
				on:click={submit((page = prev + 1))}
			>
				{prev + 1}
			</li>
		{:else}
			<li
				class="pagination-link"
				aria-label="Goto page"
				data-color="black"
				on:click={submit((page = 1))}
			>
				1
			</li>
		{/if}
		{#if page >= 1 && page < (($apiData.count / 100 + 1) ^ 0)}
			<li
				class="pagination-link"
				aria-label="Goto page"
				data-color="black"
				on:click={submit((page = page + 1))}
			>
				Next page
			</li>
		{/if}
	</ul>
</nav>
<style>
	select:invalid {
		color: gray;
	}
	option {
		color: black;
	}
</style>