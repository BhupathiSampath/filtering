<script>
	// import MultiSelect from './upload.svelte';
	import jQuery from 'jquery';
	import DateRangeSelect from 'svelte-date-range-select';
	import { download } from '@tadashi/fd';
	import { writable, derived } from 'svelte/store';
	export let apiData = writable([]);
	// export const apiData1 = writable([]);
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
		ordering = '',
		page_size = 100;
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
	async function submit(page, ordering) {
		if (page > 1) {
			prev = page - 1;
		}
		const res = await fetch(
			`http://10.10.6.87/api/data/?page_size=${page_size}&state=${state}&mutation_deletion=${mutation_deletion}&ordering=${ordering}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amino_acid_position=${amino_acid_position}&search=${search}`,
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

	onMount(async () => {
		const response = await fetch(`http://10.10.6.87/api/data/?days=${days}`, {
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

	import { onMount, tick } from 'svelte';
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

	export const pversions = writable([]);
	// $pversions.split(":")
	export const pangoapiversions = derived(pversions, ($pversions) => {
		// console.log($apiData1);
		if ($pversions) {
			// return $apiData.data1.map(strain => strain.strain);
			return $pversions;
		}
		return [];
	});
	// $pangoapiversions.split(":")
	onMount(async () => {
		const response = await fetch(`https://research.nibmg.ac.in/insacog/api/files/landing-stats/`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((results) => {
				console.log(results);
				pversions.set(results);
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
			`http://10.10.6.87/api/exportcsv/?ordering=${ordering}&mutation_deletion=${mutation_deletion}&days=${days}&start_date=${start_date}&end_date=${end_date}&date=${date}&page=${page}&lineage=${lineage}&gene=${gene}&mutation=${mutation}&reference_id=${reference_id}&strain=${strain}&amino_acid_position=${amino_acid_position}&search=${search}`,
			{
				headers: { 'content-type': 'application/json' }
			}
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.path)
				// let file_name = data.path.split('/').at(-1)
				let file_name = data.path;
				console.log(file_name);
				let download_path = `http://10.10.6.87/download/${file_name}`;
				console.log(download_path);
				getFile(download_path, file_name);
			})
			.catch((error) => {
				console.log(error);
				// return [];
			});
	}
	async function getFile(url, filename) {
		const response = await fetch(url);
		await download(response, filename);
	}

	onMount(() => {
		jQuery('#btn').click(function () {
			jQuery('#bx').toggle();
		});
	});

	onMount(() => {
		jQuery('input').hover(function () {
			jQuery('#strain').toggle();
			jQuery('#state').toggle();
			jQuery('#mutation_deletion').toggle();
			jQuery('#lineage').toggle();
		});
	});
	let iconAsc = '↑';
	let iconDesc = '↓';
</script>

<Hidden bind:this={child} />
<!-- <button id="btn" hidden>button</button> -->

<div class="columns">
	<!-- <div class="help has-text-centerd" id="btn">
	<p>Multiple lineages can be searched</p>
	</div> -->
	<div class="column">
		<div class="box" id="bx">
			<div class="columns is-centered mb-0">
				<div class="column-4" hidden>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable">Page:</label>
					<div>
						<input class="input" bind:value={page} type="text" name="page" />
					</div>
				</div>
				<div class="column-2">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={strain}
								type="text"
								placeholder="Strain"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter key value</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column-2">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={state}
								type="text"
								placeholder="State"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter key value</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column-2">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={lineage}
								type="text"
								placeholder="Lineage"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter exact match & It can be multiple</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column-2">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={mutation_deletion}
								type="text"
								placeholder="Mutaion & Deletion"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter key value or Combination of gene,mutation,reference,Amino position</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column-2">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={date}
								type="text"
								placeholder="YYYY_MM_DD"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter key value</p>
								</div>
							</div>
						</div>
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
				<!-- svelte-ignore a11y-missing-attribute -->
				<button
					class="is-clickable is-link"
					on:click={() => (child.shown = !child.shown)}
					style="background-color: lightblue;border-radius: 30px;"
					>{child && child.shown ? 'Hide advance filter' : ' Show advance filter'}</button
				>
			</div>
			{#if child && child.shown}
				<br />
				<div class="columns is-centered mb-0">
					<div class="column-2">
						<div class="dropdown is-hoverable">
							<div class="dropdown-trigger">
								<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
								<input
									class="input is-dark mr-2"
									bind:value={gene}
									type="text"
									placeholder="Gene"
								/>
								<!-- <span class="icon is-small">
								  <i class="fas fa-angle-down" aria-hidden="true"></i>
								</span> -->
								<!-- </button> -->
							</div>
							<div class="dropdown-menu" id="dropdown-menu4" role="menu">
								<div class="dropdown-content">
									<div class="dropdown-item">
										<p>Enter key value</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column-2">
						<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
							<input
								class="input is-dark mr-2"
								bind:value={reference_id}
								type="text"
								placeholder="Reference Rd"
							/>
							<!-- <span class="icon is-small">
							  <i class="fas fa-angle-down" aria-hidden="true"></i>
							</span> -->
							<!-- </button> -->
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<p>Enter key value</p>
								</div>
							</div>
						</div>
					</div>
					</div>
					<div class="column-2">
						<div class="dropdown is-hoverable">
							<div class="dropdown-trigger">
								<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
								<input
									class="input is-dark mr-2"
									bind:value={amino_acid_position}
									type="text"
									placeholder="Amino position"
								/>
								<!-- <span class="icon is-small">
								  <i class="fas fa-angle-down" aria-hidden="true"></i>
								</span> -->
								<!-- </button> -->
							</div>
							<div class="dropdown-menu" id="dropdown-menu4" role="menu">
								<div class="dropdown-content">
									<div class="dropdown-item">
										<p>Enter key value</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column-2">
						<div class="dropdown is-hoverable">
							<div class="dropdown-trigger">
								<!-- <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"> -->
								<input
									class="input is-dark mr-2"
									bind:value={mutation}
									type="text"
									placeholder="Mutation"
								/>
								<!-- <span class="icon is-small">
								  <i class="fas fa-angle-down" aria-hidden="true"></i>
								</span> -->
								<!-- </button> -->
							</div>
							<div class="dropdown-menu" id="dropdown-menu4" role="menu">
								<div class="dropdown-content">
									<div class="dropdown-item">
										<p>Enter key value</p>
									</div>
								</div>
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

					<!-- <div class="column-2"> -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- <label class="lable">SEARCH BY KEY WORD:</label> -->
					<!-- <div>
						<input bind:value={search} type="text" name="search" placeholder="Search by key word" />
					</div>
				</div> -->
				</div>
				<hr class="dashed" />
				<!-- <div class="is-divider" data-content="OR"></div> -->
				<div class="columns is-centered is-offset-4 mt-0 pt-0">
					<div class="column-2 is-4">
						<div>
							<DateRangeSelect
								class="is-6"
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
<!-- <button class="vs-button no-pointer-event m-0 is-inline-block mt-1 vs-button--null vs-button--size-small vs-button--active vs-button--transparent" data-v-163d42e1 data-v-870626b8 style="--vs-color:255,143,65;">{$pangoapiversions.nextclade_version}</button> -->
<div class="box">
	<div>
		<div class="cloumns">
			<div class="column">
				{#each $pangoversions as version}
					<div class="columns is-centered mb-0">
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable">Date</label> -->
								<div>
									<p class="title">Date: {version.date}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable">Total Records</label> -->
								<div>
									<p class="title">Total Records: {$apiData.count}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable">Total Sequences</label> -->
								<div>
									<p class="title">Total Sequences: {$count.count}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable">Pango Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.nextclade_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable">Pangolin Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.pango_designation_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable mb-2">PangoLEARN Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.pangolearn_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable mb-2">PangoLEARN Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.constellation_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable mb-2">PangoLEARN Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.pangolin_version}</p>
								</div>
							</div>
						</article>
						<article class="notification is-success mr-2 pt-2 has-text-centered">
							<div class="column-2">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<!-- <label class="lable mb-2">PangoLEARN Version</label> -->
								<div>
									<p class="title">{$pangoapiversions.pangolin_version}</p>
								</div>
							</div>
						</article>
					</div>
				{/each}
			</div>
		</div>
		<!-- <div class="box"> -->
		<div class="columns has-text-right">
			<div class="column">
				<div class="columns is-centered mb-0">
					<div class="column-2">
						<div class="select mr-2">
							<select class="is-clickable" bind:value={page_size} name="days">
								<option value={page_size} name="days">100 Records</option>
								<option value="50">50 Records</option>
								<option value="150">150 Records</option>
								<option value="200">200 Records</option>
							</select>
						</div>
					</div>
					<div class="column-2">
						<button class="button is-dark mr-2" type="submit" on:click={submit(page)}>Get</button>
					</div>
					<div class="column-2">
						<div class="pagination_section mr-5">
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
						</div>
					</div>
					<div class="column-2">
						<button class="button is-dark ml-5" type="submit" on:click={get_download_link}
							><i class="fa fa-download is-link is-clickable mr-2 mt-1" />Download Data</button
						>
					</div>
				</div>
			</div>
		</div>
		<!-- </div> -->

		<!-- <div class="has-text-right">
		Download data to csv: <button class="is-clickable" on:click={get_download_link}
			>Download <i class="fa fa-download is-link is-clickable" style="color:blue" /></button
		>
	</div> -->
		<div class="box table-container sortable">
			<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
				<thead id="head" class="has-text-centered is-sortable">
					<tr class="th">
						<!-- <th><b>#</b> <i class="fa fa-fw fa-sort"></i></th> -->
						<!-- <th rowspan="2">ID</th> -->
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>DATE <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'date'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-date'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<!-- class='fa fa-fw fa-arrow-down' -->
						<th rowspan="2"
							>STRAIN <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'strain'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-strain'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>STATE <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'state'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-state'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>LINEAGE <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'lineage'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-lineage'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>GENE <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'gene'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-gene'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>REFERENCE <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'reference_id'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-reference_id'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>AA POSITION <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'amino_acid_position'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-amino_acid_position'))}
							/></th
						>
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-missing-content -->
						<th rowspan="2"
							>MUTATION <a
								class="fa fa-fw fa-arrow-up"
								on:click={submit(page, (ordering = 'mutation'))}
							/><a
								class="fa fa-fw fa-arrow-down"
								on:click={submit(page, (ordering = '-mutation'))}
							/></th
						>
					</tr>
				</thead>
				<tbody class="has-text-centered is-info" id="body">
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
		{prev + 1} out of {($apiData.count / page_size + 1) ^ 0} pages
	</div>
{:else}
	<div class="container has-text-centered">
		{page} out of {($apiData.count / page_size + 1) ^ 0} pages
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
		font-family: 'Times New Roman', Times, serif;
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
		border: 10px;
		/* border-collapse: collapse; */
		/* border-radius: 30px; */
		/* hide standard table (collapsed) border */
		box-shadow: 0 0 0 1px rgb(129, 17, 17); /* this draws the table border  */
		width: 80px;
		/* background-color: lightblue; */
	}
	td {
		border: 1px solid rgb(204, 41, 41);
	}
	tr {
		border: 0 0 0 1px rgb(7, 4, 4);
	}
	/* div p .title{ */
	/* position: absolute; */
	/* z-index: 10; */
	/* } */
	/* #body {
		background-color: lightblue;
	} */
	#img {
		width: 50%;
		height: 20px;
	}
</style>
