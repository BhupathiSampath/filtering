<script>
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
</script>

<div class="container">
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
									<div class="control mr-5">
										<input class="input is-clickable" type="file" bind:files={file} name="file" required="required" />
									</div>
								</div>
							</div>
							<div class="level-item">
								<div class="field">
									<div class="control">
										<button class="button is-link mt-5" type="submit" on:click|preventDefault={upload}
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
</div></div>
