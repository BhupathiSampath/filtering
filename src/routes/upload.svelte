<script>
	import { Jumper } from 'svelte-loading-spinners';
	import { notifications } from './notifications.js';
	import Toast from './Toast.svelte';
	import jquery from 'jquery';
	import jQuery from 'jquery';
	import { onMount, tick } from 'svelte';
	import { update_await_block_branch } from 'svelte/internal';
	let file;
	let file_version;
	function upload() {
		var spinner = jquery('#loader');
		spinner.show();
		const dataArray = new FormData();
		dataArray.append('file', file[0]);
		dataArray.append('file_version', file_version[0]);
		const submit = fetch(`http://10.10.6.87/api/adddata/`, {
			method: 'POST',
			body: dataArray
		})
			.then((response) => response.json())
			.then((result) => {
				notifications.success('Files uploaded successfully ', 2000);
				spinner.hide();
				console.log('Success:', result);
				// preventDefault();
			})
			.catch((error) => {
				notifications.danger('Choose valid files', 2000);
				spinner.hide();
				console.error('Error:', error);
			});
	}


	onMount(() => {
		// jQuery(document).ready(function(){
		jQuery('#btn').click(function () {
			jQuery('#loader').toggle();
			jQuery('#myDiv').toggle();
		});
	});

	// });
</script>

<!-- <button id="btn1">Button</button> -->
<div class="container" id="myDiv">
	<div class="box">
		<div class="cloumns">
			<div class="column">
				<div class="container">
					<div class="columns is-centered mb-0">
						<form>
							<div class="level">
								<div class="level-left">
									<div class="level-item">
										<div class="field">
											<!-- svelte-ignore a11y-label-has-associated-control -->
											<label class="label">Versions File</label>
											<div class="control">
												<input
													class="input is-clickable"
													type="file"
													bind:files={file_version}
													name="file_version"
													required="required"
												/>
											</div>
										</div>
									</div>
									<div class="level-item">
										<div class="field">
											<!-- svelte-ignore a11y-label-has-associated-control -->
											<label class="label">Sequences File</label>
											<div class="control mr-5">
												<input
													class="input is-clickable"
													type="file"
													bind:files={file}
													name="file"
													required="required"
												/>
											</div>
										</div>
									</div>
									{#if file}
										<div class="level-item">
											<div class="field">
												<div class="control">
													<button
														class="button is-link mt-6 mb-4"
														id="btn"
														type="submit"
														on:click|preventDefault={upload}>Upload</button
													>
												</div>
											</div>
										</div>
									{:else}
										<div class="level-item">
											<div class="field">
												<div class="control">
													<button
														class="button is-link mt-6 mb-4"
														type="submit"
														on:click|preventDefault={upload}
														disabled>Upload</button
													>
												</div>
											</div>
										</div>
									{/if}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<br />

<div class="container" id="loader" hidden>
	<!-- <div class="box"> -->
	<div class="cloumns">
		<div class="column">
			<div class="container">
				<div class="columns is-centered mb-0">
					<div class="level">
						<div class="level-center">
							<div class="level-item">
								<div class="field">
									<div class="control mt-5">
										<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />Uploading...
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- </div> -->
		</div>
	</div>
</div>
<br />

<Toast />
