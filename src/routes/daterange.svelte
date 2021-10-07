<script>
  
    import DateRangeSelect from 'svelte-date-range-select';
  
    const name = 'createdDate'; 
    const heading = 'Created Date';
  
    // this limits the HTML5 date picker end date - e.g. today is used here 
    let endDateMax = new Date();
  
    // this limits the HTML5 date picker's start date - e.g. 3 years is select here
    let startDateMin = new Date(
      new Date().setFullYear(endDateMax.getFullYear(), endDateMax.getMonth() - 72)
    );
  
    // option to override the defaults - change to other language, below are the default values
    const labels = {
      notSet: 'not set',
      greaterThan: 'greater than',
      lessThan: 'less than',
      range: 'range',
      day: 'day',
      days: 'days',
      apply: 'ok'
    }
  
    // form post ids
    const startDateId = 'start_date_id' 
    const endDateId = 'end_date_id' 
  
    // executed when the user selects the range by clicking the apply button (with the fa-check icon) 
    function handleApplyDateRange(data){
      console.log(data.detail)
      // e.g. will return an object  
      // {
      //  startDate: 2000-12-01,
      //  endDate: 2020-04-06,
      //  name: createdDate
      // }
    }
  
  </script>
  
  <DateRangeSelect
      {startDateMin}
      {endDateMax}
      {name}
      {heading}
      {labels}
      {startDateId}
      {endDateId}
      on:onApplyDateRange={handleApplyDateRange} />
  
  <!-- Below this is an example on how to use the CSS styling,
       you dont need to wrap it in svelte:head if you deploy in
            your app, this is to allow styles to work in the REPL.
  -->
  <svelte:head>
      <!-- :root vars, credits to mjgarten#1939 -->
      <style>
          :root {
              --dateSelectWidth: 135px;
          }
      </style>
  </svelte:head>
  
  