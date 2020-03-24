$(document).ready(function () {
    // activities logic
    updateTotalCost();

    // remove button listener
    $(document).on("click", ".btn-remove", function () {
        $(this).closest("tr").remove();
        updateTotalCost();
    });

    // add button listener
    $(document).on("click", "#btn-add", function (event) {
        $activity = $("#input-activity").val().trim();
        $cost = $("#input-cost").val().trim();
        if (!$activity) return;
        if (!$cost) return;
        event.preventDefault();
        $("#activity-content").append(`<tr><td scope="row">${$activity}</td><td class="cost">${$cost}</td><td><button class="btn btn-danger btn-sm btn-remove">Remove</button></td></tr>`)
        updateTotalCost();
        $("#input-activity").val("");
        $("#input-cost").val("");
    });


    /**
     * sum up all the activities cost and show the result
     * @returns {number} the total cost
     */
    function updateTotalCost() {
        var sum = 0.0;
        var allCost = $(".cost");
        for (var i = 0; i < allCost.length; i++) {
            var cost = parseFloat(allCost[i].textContent);
            if (!isNaN(cost)) {
                sum += cost;
            }
        }

        $("#totalCost")[0].textContent = sum;
        return sum;
    }


})
