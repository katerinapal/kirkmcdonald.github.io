
import { color } from ".\\visualize.js";
functionPlot({
    target: "#solution",
    xAxis: {
        label: 'crude oil',
        domain: [0, 120]
    },
    yAxis: {
        label: 'recipe ratios',
        domain: [0, 3]
    },
    annotations: [{
        x: 2300/39,
        text: 'minimum'
    }, {
        x: 200/3,
        text: 'maximum'
    }],
    data: [{
        fn: '13x/400 - 23/12',
        color: 'red'
    }, {
        fn: '7x/400 - 1/4',
        color: 'orange'
    }, {
        fn: '3x/50 - 10/3',
        color: '#4040e8'
    }, {
        fn: '-x/20 + 10/3',
        color: '#05b378'
    }, {
        fn: '-x + 305/3',
        color: 'steelblue'
    }]
})

export var minimum = {
    fn: 'x',
    skipTip: true,
    color: "red",
};

export var options = {
    target: "#vector",
    xAxis: {
        domain: [0, 100],
        label: 'light oil',
    },
    yAxis: {
        domain: [0, 100],
        label: 'heavy oil',
    },
    disableZoom: true,
    data: [minimum],
};

var vectors = functionPlot(options)
function vectormousemove(coords) {
    var x = coords.x
    var y = coords.y
    var recipes = [
        [ 30, -40, "red"],
        [ 30,  30, "#4040e8"],
        [ 45,  10, "#05b378"],
    ]
    var solutions = [
        [              0, -x/105 + 3*y/70,    x/35 - y/35],
        [x/210 - 3*y/140,               0, 2*x/105 + y/70],
        [    x/70 - y/70,  2*x/105 + y/70,              0]
    ]
    var first = [-1, 0]
    var firstColor = "black"
    var second = [0, 0]
    var secondColor = "black"
    for (var i in solutions) {
        var valid = true
        for (var j in solutions[i]) {
            if (solutions[i][j] < 0) {
                valid = false
                break
            }
        }
        if (valid) {
            document.getElementById("crack").textContent = solutions[i][0]
            document.getElementById("basic").textContent = solutions[i][1]
            document.getElementById("adv").textContent = solutions[i][2]
            var j = 0
            var doFirst = true
            for (j in solutions[i]) {
                if (j == i) {
                    continue
                }
                var recipe = recipes[j]
                var current = [
                    recipe[0] * solutions[i][j],
                    recipe[1] * solutions[i][j],
                ]
                var color = recipe[2]
                if (doFirst) {
                    first = current
                    firstColor = color
                    doFirst = false
                } else {
                    second = current
                    secondColor = color
                }
            }
            break
        }
    }
    options.data = [minimum]
    if (first[0] == -1) {
        document.getElementById("crack").textContent = "X"
        document.getElementById("basic").textContent = "X"
        document.getElementById("adv").textContent = "X"
        options.data.push({
            points: [
                [30, 20],
                [70, 80],
            ],
            fnType: 'points',
            graphType: 'polyline',
            color: 'red'
        })
        options.data.push({
            points: [
                [30, 80],
                [70, 20],
            ],
            fnType: 'points',
            graphType: 'polyline',
            color: 'red'
        })
    } else {
        options.data.push({
            vector: second,
            graphType: 'polyline',
            fnType: 'vector',
            skipTip: true,
            color: secondColor,
        })
        options.data.push({
            vector: first,
            offset: second,
            graphType: 'polyline',
            fnType: 'vector',
            skipTip: true,
            color: firstColor,
        })
    }
    vectors = functionPlot(options)
}
vectors.on("mousemove", vectormousemove)

functionPlot({
    target: "#solution",
    xAxis: {
        label: 'crude oil',
        domain: [0, 120]
    },
    yAxis: {
        label: 'recipe ratios',
        domain: [0, 3]
    },
    annotations: [{
        x: 2300/39,
        text: 'minimum'
    }, {
        x: 200/3,
        text: 'maximum'
    }],
    data: [{
        fn: '13x/400 - 23/12',
        color: 'red'
    }, {
        fn: '7x/400 - 1/4',
        color: 'orange'
    }, {
        fn: '3x/50 - 10/3',
        color: '#4040e8'
    }, {
        fn: '-x/20 + 10/3',
        color: '#05b378'
    }, {
        fn: '-x + 305/3',
        color: 'steelblue'
    }]
})

var minimum = {
    fn: 'x',
    skipTip: true,
    color: "red",
}
var options = {
    target: "#vector",
    xAxis: {
        domain: [0, 100],
        label: 'light oil',
    },
    yAxis: {
        domain: [0, 100],
        label: 'heavy oil',
    },
    disableZoom: true,
    data: [minimum],
}
var vectors = functionPlot(options)
function vectormousemove(coords) {
    var x = coords.x
    var y = coords.y
    var recipes = [
        [ 30, -40, "red"],
        [ 30,  30, "#4040e8"],
        [ 45,  10, "#05b378"],
    ]
    var solutions = [
        [              0, -x/105 + 3*y/70,    x/35 - y/35],
        [x/210 - 3*y/140,               0, 2*x/105 + y/70],
        [    x/70 - y/70,  2*x/105 + y/70,              0]
    ]
    var first = [-1, 0]
    var firstColor = "black"
    var second = [0, 0]
    var secondColor = "black"
    for (var i in solutions) {
        var valid = true
        for (var j in solutions[i]) {
            if (solutions[i][j] < 0) {
                valid = false
                break
            }
        }
        if (valid) {
            document.getElementById("crack").textContent = solutions[i][0]
            document.getElementById("basic").textContent = solutions[i][1]
            document.getElementById("adv").textContent = solutions[i][2]
            var j = 0
            var doFirst = true
            for (j in solutions[i]) {
                if (j == i) {
                    continue
                }
                var recipe = recipes[j]
                var current = [
                    recipe[0] * solutions[i][j],
                    recipe[1] * solutions[i][j],
                ]
                var color = recipe[2]
                if (doFirst) {
                    first = current
                    firstColor = color
                    doFirst = false
                } else {
                    second = current
                    secondColor = color
                }
            }
            break
        }
    }
    options.data = [minimum]
    if (first[0] == -1) {
        document.getElementById("crack").textContent = "X"
        document.getElementById("basic").textContent = "X"
        document.getElementById("adv").textContent = "X"
        options.data.push({
            points: [
                [30, 20],
                [70, 80],
            ],
            fnType: 'points',
            graphType: 'polyline',
            color: 'red'
        })
        options.data.push({
            points: [
                [30, 80],
                [70, 20],
            ],
            fnType: 'points',
            graphType: 'polyline',
            color: 'red'
        })
    } else {
        options.data.push({
            vector: second,
            graphType: 'polyline',
            fnType: 'vector',
            skipTip: true,
            color: secondColor,
        })
        options.data.push({
            vector: first,
            offset: second,
            graphType: 'polyline',
            fnType: 'vector',
            skipTip: true,
            color: firstColor,
        })
    }
    vectors = functionPlot(options)
}
vectors.on("mousemove", vectormousemove)
