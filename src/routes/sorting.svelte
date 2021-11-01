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
</head><br><br>
<div class="file is-small">
	<label class="file-label">
	  <input class="file-input" type="file" name="resume">
	  <span class="file-cta">
		<span class="file-icon">
		  <i class="fas fa-upload"></i>
		</span>
		<span class="file-label">
		  Small file…
		</span>
	  </span>
	</label>
  </div>