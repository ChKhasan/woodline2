<template lang="html">
    <div class="container-shop py-10">
      <div class="row">
        <div class="col-md-4 mb-6 mb-md-0">
          <div
            class="d-flex border-md-right justify-content-center align-items-center"
          >
            <div class="ci-img w-52px mr-5">
              <img src="../../static/images/icon-box-03.png" alt="" />
            </div>
            <div class="ci-body">
              <h3 class="fs-20 mb-1">100 Days Return</h3>
              <p class="mb-0 font-weight-500 fs-15">No question asked</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-6 mb-md-0">
          <div
            class="d-flex border-md-right justify-content-center align-items-center"
          >
            <div class="ci-img w-52px mr-5">
              <img src="../../static/images/icon-box-02.png" alt="" />
            </div>
            <div class="ci-body">
              <h3 class="fs-20 mb-1">Lifetime Warranty</h3>
              <p class="mb-0 font-weight-500 fs-15">For original owners</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-6 mb-md-0">
          <div class="d-flex justify-content-center align-items-center">
            <div class="ci-img w-52px mr-5">
              <img src="../../static/images/icon-box-01.png" alt="" />
            </div>
            <div class="ci-body">
              <h3 class="fs-20 mb-1">Custom Services</h3>
              <p class="mb-0 font-weight-500 fs-15">Our priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {};
  </script>
  <style lang="css">
  .w-52px {
    width: 52px !important;
  }
  .ci-img img {
    width: 100%;
  }
  .mr-5 {
    margin-right: 1.5rem !important;
  }
  .ci-body h3 {
    font-size: 20px !important;
    font-weight: 700 !important;
    line-height: 1.25;
    font-family: "Poppins", sans-serif;
  }
  .ci-body p {
    font-weight: 500 !important;
    font-family: "Poppins", sans-serif;
    font-size: 15px !important;
    line-height: 1.63;
    color: #777;
  }
  @media (min-width: 768px) {
    .border-md-right {
      border-right: 1px solid #e4e4e4 !important;
    }
  }
  .mb-6,
  .my-6 {
    margin-bottom: 1.875rem !important;
  }
  
  .py-10 {
    padding-bottom: 4.375rem !important;
    padding-top: 4.375rem !important;
  }
  </style>
  