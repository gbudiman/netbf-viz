$('#graph-draw-button').on('click', function() {
  var graph = {
    nodes: [],
    links: [],
    edges: [],
    paths: []
  }

  var rows = $('#graph-input').val().trim().split(/[\r\n]/);

  $.each(rows, function(i, x) {
    graph.nodes.push({ id: i });
    graph.edges.push({ id: i, edges: [] })
    graph.paths.push(new Array());

    $.each(x.split(/\,/), function(j, y) {
      if (y[0] == '*') {
      } else {
        if (i != j) {
          graph.links.push({ source: i, target: j, weight: y });
          graph.edges[i].edges.push({ target: j, weight: parseInt(y) });
        }
      }
    })
  })

  viz(graph);
  bellman_ford_solver(graph);
  display_solution(graph);
})

$('#graph-load-example').on('click', function() {
  var example = '0,*,100,10,*,32,*' + "\n"
              + '4,0,*,*,17,*,5' + "\n"
              + '5,*,0,30,*,42,*' + "\n"
              + '*,23,3,0,14,*,*' + "\n"
              + '*,10,*,26,0,2,*' + "\n"
              + '*,*,9,13,3,0,*' + "\n"
              + '*,6,*,*,12,12,0';

  $('#graph-input').val(example);
  $('#graph-draw-button').trigger('click');
})

$('#graph-draw-button').trigger('click');

$('#unfix-position-button').on('click', function() {
  //svg.selectAll('.node').classed('fixed', false);
  force.nodes().forEach(function(d) { d.fixed = false; });
  $('#unfix-position').css('visibility', 'hidden');
})