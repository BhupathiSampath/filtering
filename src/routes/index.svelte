<script>
	import MultiSelect from './sorting.svelte';
	import DateRangeSelect from 'svelte-date-range-select';
	import { download } from '@tadashi/fd'
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
		amino_acid_position = '',
		search = '',
		page = 1,
		prev = '',
		start_date = '',
		end_date = '',
		days = 36500,
		next = '',
		state = '',
		mutation_deletion = '',
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
			prev = page - 1;
		}
		const res = await fetch(
			`http://10.10.6.87/api/data1/?state=${state}&mutation_deletion=${mutation_deletion}&ordering=${ordering}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amino_acid_position=${amino_acid_position}&search=${search}`,
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
		// console.log($apiData1);
		if ($apiData1.path) {
			// return $apiData.data1.map(strain => strain.strain);
			return $apiData1.path;
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
	let file_version;
	function upload() {
		const dataArray = new FormData();
		dataArray.append('file', file[0]);
		dataArray.append('file_version', file_version[0]);
		const submit = fetch(`http://10.10.6.87/api/adddata/`, {
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

	export const count = writable([]);
	export const seqcount = derived(count, ($count) => {
		// console.log($apiData1);
		if ($count.count) {
			// return $apiData.data1.map(strain => strain.strain);
			return $count.count;
		}
		return [];
	});
	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/count/`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				count.set(data);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	});
	export const lindrop = writable([]);
	export const lineagedrop = derived(lindrop, ($lindrop) => {
		// console.log($apiData1);
		if ($lindrop.results) {
			// return $apiData.data1.map(strain => strain.strain);
			return $lindrop.results;
		}
		return [];
	});
	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/lineagedrop/`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((results) => {
				console.log(results);
				lindrop.set(results);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	});
	export const versions = writable([]);
	export const pangoversions = derived(lindrop, ($lindrop) => {
		// console.log($apiData1);
		if ($versions.results) {
			// return $apiData.data1.map(strain => strain.strain);
			return $versions.results;
		}
		return [];
	});
	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/pangoversion/`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((results) => {
				console.log(results);
				versions.set(results);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	});
	import Hidden from './advancefilter.svelte';
	let child;


	async function get_download_link() {
		const res = await fetch(
			`http://10.10.6.87/api/exportcsv/?ordering=${ordering}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amino_acid_position=${amino_acid_position}&search=${search}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.path)
				// let file_name = data.path.split('/').at(-1)
				let file_name = data.path
				console.log(file_name)
				let download_path = `http://10.10.6.87/download/${file_name}`
				console.log(download_path)
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

<Hidden bind:this={child} />

<div class="cloumns">
	<div class="column">
		<div class="box" style="background-color: lightblue;">
			<div class="columns is-centered mb-0">
				<form>
					<div class="level">
						<div class="level-left">
							<div class="level-item">
								<div class="field">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="label">Version File</label>
									<div class="control">
										<input class="input is-clickable" type="file" bind:files={file_version} name="file_version" required="required" />
									</div>
								</div>
							</div>
							<div class="level-item">
								<div class="field">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="label">Upload File</label>
									<div class="control">
										<input class="input is-clickable" type="file" bind:files={file} name="file" required="required" />
									</div>
								</div>
							</div>
							<div class="level-item">
								<div class="field">
									<div class="control">
										<button class="button is-link" type="submit" on:click|preventDefault={upload}
											>Upload</button
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
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
						<input class="input" bind:value={page} type="text" name="page" />
					</div>
				</div>
				<div class="column-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">STRAIN:</label> -->
					<div>
						<input
							class="input is-dark mr-2"
							bind:value={strain}
							type="text"
							name="strain"
							placeholder="Strain"
						/>
					</div>
				</div>
				<div class="column-2">
					<div>
						<input class="input is-dark mr-2" bind:value={state} type="text" placeholder="state" />
					</div>
				</div>
				<div class="column-2">
					<div>
						<input
							class="input is-dark mr-2"
							bind:value={lineage}
							type="text"
							name="lineage"
							placeholder="Lineage"
						/>
					</div>
				</div>
				<div class="column-2">
					<div>
						<input
							class="input is-dark mr-2"
							bind:value={mutation_deletion}
							type="text"
							placeholder="mutation_deletion"
						/>
					</div>
				</div>
				<div class="column-2">
					<div>
						<input
							class="input is-dark mr-2"
							bind:value={date}
							type="text"
							placeholder="yyyy-mm-dd"
						/>
					</div>
				</div>
				<div class="column-2">
					<div>
						<div class="select mr-2">
							<select class="is-clickable" bind:value={days} name="days">
								<option value={days} name="days">All data</option>
								<option value="7">Last week</option>
								<option value="14">Last 2 weeks</option>
								<option value="21">Last 3 weeks</option>
								<option value="30">Last month</option>
								<option value="60">Last 2 months</option>
								<option value="90">Last 3 months</option>
								<option value="120">Last 4 months</option>
								<option value="150">Last 5 months</option>
								<option value="182">Last 6 months</option>
								<option value="365">This year</option>
							</select>
						</div>
					</div>
				</div>
				<div class="column-6">
					<div>
						<button class="button is-link mr-2" type="submit" on:click={submit(page)}
							>Get Data</button
						>
					</div>
				</div>
			</div>
			<br />
			<div class="columns is-centered mb-0">
				<button class="is-clickable" on:click={() => (child.shown = !child.shown)} style="color:blue"
					>{child && child.shown ? 'Hide advance filter' : ' Show advance filter'}</button
				>
			</div>
			{#if child && child.shown}
			<br />
				<div class="columns is-centered mb-0">
					<div class="column-2">
						<div>
							<input
								class="input is-dark mr-2"
								bind:value={mutation}
								type="text"
								name="mutation"
								placeholder="Mutation"
							/>
						</div>
					</div>
					<div class="column-2">
						<div>
							<input
								class="input is-dark mr-2"
								bind:value={gene}
								type="text"
								name="gene"
								placeholder="Gene"
							/>
						</div>
					</div>
					<div class="column-2">
						<div>
							<input
								class="input is-dark mr-2"
								bind:value={reference_id}
								type="text"
								name="reference_id"
								placeholder="Reference"
							/>
						</div>
					</div>
					<div class="column-2">
						<div>
							<input
								class="input is-dark mr-2"
								bind:value={amino_acid_position}
								type="text"
								name="amino_acid_position"
								placeholder="AA Position"
							/>
						</div>
					</div>
					<div class="column-6">
						<div>
							<button class="button is-link mr-2" type="submit" on:click={submit(page)}
								>Get Data</button
							>
						</div>
					</div>

					<!-- <div class="column-2"> -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">SEARCH BY KEY WORD:</label> -->
					<!-- <div>
						<input bind:value={search} type="text" name="search" placeholder="Search by key word" />
					</div>
				</div> -->
				</div>
				<hr class="dashed">
				<!-- <div class="is-divider" data-content="OR"></div> -->
				<div class="columns is-centered is-offset-4 mt-0 pt-0">
					<div class="column-2">
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
			{/if}
		</div>
	</div>
</div>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<div>
	<div>
		<div class="cloumns">
			<div class="column">
				{#each $pangoversions as version}
					<div class="columns is-centered mb-0">
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable">Date</label>
								<div>
									<p class="title">{version.date}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable">Total Records</label>
								<div>
									<p class="title">{$apiData.count}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable">Total Sequences</label>
								<div>
									<p class="title">{$count.count}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable">Pango Version</label>
								<div>
									<p class="title">{version.version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable">Pangolin Version</label>
								<div>
									<p class="title">{version.pangolin_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="lable mb-2">PangoLEARN Version</label>
								<div>
									<p class="title">{version.pangoLEARN_version}</p>
								</div>
							</div>
						</article>
						<!-- <article class="notification is-success mr-2 has-text-centered"> -->
							<div class="column-2 mt-5 pt-3" style="height: 20px;">
								<div class="container has-text-right">
									Download data to csv: <button class="is-clickable" on:click={get_download_link}
										>Download <i class="fa fa-download is-link is-clickable" style="color:blue" /></button
									>
								</div>
							</div>
						<!-- </article> -->
					</div>
				{/each}
			</div>
		</div>

		<div class="table-container sortable">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
				<thead id="head" class="has-text-centered is-sortable">
					<tr class="th">
						<!-- <th rowspan="2">ID</th> -->
						<th rowspan="2">DATE</th>
						<th rowspan="2">STRAIN</th>
						<th rowspan="2">STATE</th>
						<th rowspan="2">LINEAGE</th>
						<th rowspan="2">GENE</th>
						<th rowspan="2">REFERENCE</th>
						<th rowspan="2">AA POSITION</th>
						<th rowspan="2">MUTATION</th>
					</tr>
				</thead>
				<tbody class="has-text-centered">
					{#each $Data as data}
						<tr>
							<!-- <th scope="row">{data.id}</th> -->
							<td>{data.date}</td>
							<td>{data.strain}</td>
							<td>{data.state}</td>
							<td>{data.lineage}</td>
							<td>{data.gene}</td>
							<td>{data.reference_id}</td>
							<td>{data.amino_acid_position}</td>
							<td>{data.mutation}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
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
	<ul class="pagination-list is-clickable">
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
	p {
		display: inline;
		word-wrap: break-word;
		float: inline-end;
	}
	.title {
		color: rgb(27, 181, 233);
		font-size: 15px;
	}
	.lable {
		font-size: 15px;
	}
	.input {
		width: 180px;
		/* margin: 1px; */
	}
	.notification {
		border-radius: 10px;
		/* width: 200px; */
		height: 70px;
		/* padding: 5px 10px; */
		/* flex: block; */
	
	}
	table {
		border-collapse: collapse;
		/* border-radius: 30px; */
		border-style: hidden; /* hide standard table (collapsed) border */
		box-shadow: 0 0 0 1px rgb(129, 17, 17); /* this draws the table border  */
	}
	td {
		border: 1px solid rgb(5, 5, 5);
	}
	/* div p .title{ */
		/* position: absolute; */
		/* z-index: 10; */
	/* } */
</style>