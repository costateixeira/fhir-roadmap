//$(document).ready( function () {
const nodeFilterSelector = document.getElementById("nodeFilterSelect");
const edgeFilters = document.getElementsByName("edgesFilter");
const nodeFilterSelector2 = document.getElementById("nodeFilterSelect2");

function startNetwork(data) {
  const container = document.getElementById("mynetwork");
  const options = {
    edges: {
      //           length: 400 // Longer edges between nodes.
    },
    physics: {
      // Even though it's disabled the options still apply to network.stabilize().
      enabled: true,
      solver: "repulsion",
      repulsion: {
        nodeDistance: 200 // Put more distance between the nodes.
      }
    }
  };
  new vis.Network(container, data, options);
  //  network.stabilize();
}

/**
 * filter values are updated in the outer scope.
 * in order to apply filters to new values, DataView.refresh() should be called
 */
let nodeFilterValue = "";
const edgesFilterValues = {
  binding_req: true,
  binding_req: true,
  binding_ext: true,
  binding_pref: true,
  binding_exm: true,
  extension: true,
  contains: true,
  values_from: true,
  system: true,



};

/*
filter function should return true or false
based on whether item in DataView satisfies a given condition.
*/
const nodesFilter = (node) => {
  if (nodeFilterValue === "") {
    return true;
  }
  switch (nodeFilterValue) {
    case "Profile":
      return node.type === "Profile";
    case "Extension":
      return node.type === "Extension";
    case "CodeSystem":
      return node.type === "CodeSystem";
    case "ValueSet":
      return node.type === "ValueSet";
    case "LogicalModel":
      return node.type === "LogicalModel";
    case "Transaction":
      return node.type === "Transaction";
    case "Questionnaire":
      return node.type === "Questionnaire";
    case "Vaccination":
      return node.topic === "Vaccination";
    case "Core":
      return node.topic === "Core";
    case "Terminology":
      return node.topic === "Terminology";
    case "Addiction":
      return node.topic === "Addiction";
    case "Problem":
      return node.topic === "Problem";
    case "Medication":
      return node.topic === "Medication";
    case "Allergy / Intolerance":
      return node.topic === "Allergy / Intolerance";
    default:
      return true;
  }
};
var _nodes = new vis.DataSet();
var _edges = new vis.DataSet();


var data = {
  nodes: _nodes,
  edges: _edges,
};

$.getJSON('../data/edges.json', function (edges) {
  _edges.add(edges);
});
$.getJSON('../data/nodes.json', function (nodes) {
  _nodes.add(nodes);
});

const edgesFilter = (edge) => {
  return edgesFilterValues[edge.relation];
};

const nodesView = new vis.DataView(_nodes, { filter: nodesFilter });
const edgesView = new vis.DataView(_edges, { filter: edgesFilter });

nodeFilterSelector.addEventListener("change", (e) => {
  // set new value to filter variable
  nodeFilterValue = e.target.value;
  /*
  refresh DataView,
  so that its filter function is re-calculated with the new variable
*/
  nodesView.refresh();
});

nodeFilterSelector2.addEventListener("change", (e) => {
  // set new value to filter variable
  nodeFilterValue = e.target.value;
  /*
  refresh DataView,
  so that its filter function is re-calculated with the new variable
*/
  nodesView.refresh();
});

edgeFilters.forEach((filter) =>
  filter.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    edgesFilterValues[value] = checked;
    edgesView.refresh();
  })
);
startNetwork({ nodes: nodesView, edges: edgesView });
//startNetwork({ nodes: nodesView, edges: edgesView });
//});

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
