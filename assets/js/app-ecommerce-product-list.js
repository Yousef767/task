/**
 * app-ecommerce-product-list
 */

"use strict";

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_product_table = $(".datatables-products"),
    productAdd = "app-ecommerce-product-add.html",
    statusObj = {
      1: { title: "Scheduled", class: "bg-label-warning" },
      2: { title: "Publish", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-danger" },
    },
    categoryObj = {
      0: { title: "Household" },
      1: { title: "Office" },
      2: { title: "Electronics" },
      3: { title: "Shoes" },
      4: { title: "Accessories" },
      5: { title: "Game" },
    },
    stockObj = {
      0: { title: "Out_of_Stock" },
      1: { title: "In_Stock" },
    },
    stockFilterValObj = {
      0: { title: "Out of Stock" },
      1: { title: "In Stock" },
    };

  // E-commerce Products datatable
  const cookieData = Cookies.get("products");

  // Check if data exists in cookies, if not fallback to default (e.g., AJAX)
  let productData = cookieData ? JSON.parse(cookieData) : [];

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      data: productData,
      columns: [
        // columns according to JSON
        { data: "id" },
        { data: "product_name" },
        { data: "category" },
        { data: "stock" },
        { data: "sku" },
        { data: "price" },
        { data: "action" },
        { data: "" },
        { data: "" },
        { data: "" },
    
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
          },
          searchable: false,
        },
        {
          // Product name and product_brand
          targets: 2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full["product_name"],
              $id = full["id"],
              $product_brand = full["product_brand"],
              $image = full["image"];
            if ($image) {
              // For Product image

              var $output =
                '<img src="' +
                assetsPath +
                "img/ecommerce-images/" +
                $image +
                '" alt="Product-' +
                $id +
                '" class="rounded">';
            } else {
              // For Product badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = [
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "primary",
                "secondary",
              ];
              var $state = states[stateNum],
                $name = full["product_brand"],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (
                ($initials.shift() || "") + ($initials.pop() || "")
              ).toUpperCase();
              $output =
                '<span class="avatar-initial rounded-2 bg-label-' +
                $state +
                '">' +
                $initials +
                "</span>";
            }
            // Creates full output for Product name and product_brand
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center product-name">' +
              '<h6 class="text-nowrap mb-0">' +
              $name +
              "</h6>" +
              "</div>";
            return $row_output;
          },
        },
        {
          // Product Category

          targets: 3,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            var $category = full[["category"]];
            var categoryBadgeObj = {
              Household:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-warning me-4 p-3"><i class="bx bx-briefcase bx-sm"></i></span>',
              Office:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-info me-4 p-3"><i class="bx bx-home-smile bx-sm"></i></span>',
              Electronics:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-danger me-4 p-3"><i class="bx bx-headphone bx-sm"></i></span>',
              Shoes:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-success me-4"><i class="bx bx-walk bx-sm"></i></span>',
              Accessories:
                '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-secondary me-4"><i class="bx bxs-watch bx-sm"></i></span>',
              Game: '<span class="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-primary me-4"><i class="bx bx-laptop bx-sm"></i></span>',
            };
            return (
              "<span class='text-truncate d-flex align-items-center text-heading'>" +
              categoryBadgeObj[$category] +
              $category +
              "</span>"
            );
          },
        },
        {
          // Stock
          targets: 4,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            var $stock = full[["in_stock"]];
            var stockSwitchObj = {
              Out_of_Stock:
                '<label class="switch switch-primary switch-sm">' +
                '<input type="checkbox" class="switch-input" id="switch">' +
                '<span class="switch-toggle-slider">' +
                '<span class="switch-off">' +
                "</span>" +
                "</span>" +
                "</label>",
              In_Stock:
                '<label class="switch switch-primary switch-sm">' +
                '<input type="checkbox" class="switch-input" checked="">' +
                '<span class="switch-toggle-slider">' +
                '<span class="switch-on">' +
                "</span>" +
                "</span>" +
                "</label>",
            };
            return (
              "<span class='text-truncate'>" +
              [$stock] +
              '<span class="d-none">' +
              [$stock] +
              "</span>" +
              "</span>"
            );
          },
        },
        {
          // Sku
          targets: 5,
          render: function (data, type, full, meta) {
            var $sku = full[["product_sku"]];

            return "<span>" + $sku + "</span>";
          },
        },
        {
          // price
          targets: 6,
          render: function (data, type, full, meta) {
            var $price = full[["price"]];

            return "<span>" + $price + "</span>";
          },
        },

        {
          // Actions
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<button class="btn btn-icon"><i class="bx bx-edit bx-md"></i></button>' +
              '<button class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded bx-md"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:0;" class="dropdown-item">View</a>' +
              '<a href="javascript:0;" class="dropdown-item">Suspend</a>' +
              "</div>" +
              "</div>"
            );
          },
        },
      ],
      // Buttons with Dropdown
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle me-4",
          text: '<i class="bx bx-export me-2 bx-xs"></i>Export',
          buttons: [
            {
              extend: "print",
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
              customize: function (win) {
                // Customize print view for dark
                $(win.document.body)
                  .css("color", headingColor)
                  .css("border-color", borderColor)
                  .css("background-color", bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="bx bxs-file-export me-2"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="bx bx-plus me-0 me-sm-1 bx-xs"></i><span class="d-none d-sm-inline-block">Add Product</span>',
          className: "add-new btn btn-primary",
          action: function () {
            window.location.href = productAdd;
          },
        },
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["product_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    "<td>" +
                    col.title +
                    ":" +
                    "</td> " +
                    "<td>" +
                    col.data +
                    "</td>" +
                    "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(-2)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductStatus" class="form-select text-capitalize"><option value="">Status</option></select>'
            )
              .appendTo(".product_status")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    statusObj[d].title +
                    '">' +
                    statusObj[d].title +
                    "</option>"
                );
              });
          });
        // Adding category filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductCategory" class="form-select text-capitalize"><option value="">Category</option></select>'
            )
              .appendTo(".product_category")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    categoryObj[d].title +
                    '">' +
                    categoryObj[d].title +
                    "</option>"
                );
              });
          });
        // Adding stock filter once table initialized
        this.api()
          .columns(4)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductStock" class="form-select text-capitalize"><option value=""> Stock </option></select>'
            )
              .appendTo(".product_stock")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    stockObj[d].title +
                    '">' +
                    stockFilterValObj[d].title +
                    "</option>"
                );
              });
          });
      },
    });
    $(".dataTables_length").addClass("mx-n2");
    $(".dt-buttons").addClass("d-flex flex-wrap mb-6 mb-sm-0");
  }

  // Delete Record
  $(".datatables-products tbody").on("click", ".delete-record", function () {
    dt_products.row($(this).parents("tr")).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});