<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
	<title>INSACOG|Query Metadata</title>
</head>
<nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
	  <!-- svelte-ignore a11y-missing-attribute -->
	  <!-- <div class="logo-image has-text-centered"> -->
		<img src="./INSACOG_Logo2.png" class="img-fluid">
  	<!-- </div> -->
	<div class="navbar-item ml-6">
        <div class="field is-grouped">
          <p class="control">
              <a class="button" href="/upload">
                <!-- <span class="icon">
                  <i class="fas fa-download"></i>
                </span> -->
                <span>Upload</span>
              </a>
            </p>
        </div>
      </div>
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
              <a class="button mr-3" href="/">
                <!-- <span class="icon">
                  <i class="fas fa-download"></i>
                </span> -->
                <span>Sequences</span>
              </a>
            </p>
        </div>
      </div>
	</div>
  </nav><br><br><br>
  <style>
    .img-fluid {
    display: block;
    /* margin-left: auto;
    margin-right: auto; */
    width: 50%;
}
.navbar {
      justify-content: center;
}
.navbar-item {
      justify-content: center;
}
.navbar {
    height: 20px;
}
</style>
  <slot />


