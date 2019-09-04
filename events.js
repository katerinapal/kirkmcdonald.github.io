import { settings_showDebug_modificationFunc_11 } from ".\\settings.js";
import { showDebug } from ".\\settings.js";
import { settings_tooltipsEnabled_modificationFunc_10 } from ".\\settings.js";
import { tooltipsEnabled } from ".\\settings.js";
import { settings_displayFormat_modificationFunc_9 } from ".\\settings.js";
import { displayFormat } from ".\\settings.js";
import { settings_linkLength_modificationFunc_8 } from ".\\settings.js";
import { linkLength } from ".\\settings.js";
import { settings_maxNodeHeight_modificationFunc_7 } from ".\\settings.js";
import { maxNodeHeight } from ".\\settings.js";
import { settings_visDirection_modificationFunc_6 } from ".\\settings.js";
import { visDirection } from ".\\settings.js";
import { settings_visualizer_modificationFunc_5 } from ".\\settings.js";
import { visualizer } from ".\\settings.js";
import { settings_countPrecision_modificationFunc_4 } from ".\\settings.js";
import { countPrecision } from ".\\settings.js";
import { settings_ratePrecision_modificationFunc_3 } from ".\\settings.js";
import { ratePrecision } from ".\\settings.js";
import { settings_rateName_modificationFunc_2 } from ".\\settings.js";
import { rateName } from ".\\settings.js";
import { settings_displayRateFactor_modificationFunc_1 } from ".\\settings.js";
import { displayRateFactor } from ".\\settings.js";
import { displayRates } from ".\\settings.js";
import { globalTotals } from ".\\display.js";
import { display_sortOrder_modificationFunc_0 } from ".\\display.js";
import { sortOrder } from ".\\display.js";
import { build_targets } from ".\\target.js";
import { initDone } from ".\\init.js";
import { fuel } from ".\\init.js";
import { spec } from ".\\init.js";
import { solver } from ".\\init.js";
import { recipeTable } from ".\\init.js";
import { renderGraph } from ".\\visualize.js";
import { getMprod } from ".\\settings.js";
import { setMinPipe } from ".\\settings.js";
import { setPreferredBelt } from ".\\settings.js";
import { setKovarex } from ".\\settings.js";
import { setOilRecipe } from ".\\settings.js";
import { setPreferredFuel } from ".\\settings.js";
import { setMinimumAssembler } from ".\\settings.js";
import { setColorScheme } from ".\\settings.js";
import { currentMod } from ".\\settings.js";
import { RationalFromString } from ".\\rational.js";
import { formatSettings } from ".\\fragment.js";
import { setDefaultBeacon } from ".\\factory.js";
import { setDefaultModule } from ".\\factory.js";
import { moduleCount } from ".\\factory.js";
import { setFurnace } from ".\\factory.js";
import { copyModules } from ".\\factory.js";
import { setModule } from ".\\factory.js";
import { getModule } from ".\\factory.js";
import { display } from ".\\display.js";
import { itemUpdate } from ".\\display.js";
import { setDisplayedModule } from ".\\display.js";
import { remove } from ".\\display.js";
import { updateDisplayedModules } from ".\\display.js";
import { setIgnore } from ".\\display.js";
import { add } from ".\\totals.js";
import { isFactoryTarget } from ".\\target.js";
import { addTarget } from ".\\target.js";
import { rateChanged } from ".\\target.js";
import { factoriesChanged } from ".\\target.js";
import { displayRecipes } from ".\\target.js";
import { index } from ".\\matrix.js";
import { setLength } from ".\\steps.js";
import { setPipes } from ".\\steps.js";
import { findSubgraphs } from ".\\solve.js";
import { loadData } from ".\\init.js";
import { reset } from ".\\init.js";
import { value } from ".\\d3-sankey\\sankey.js";
/*Copyright 2015-2019 Kirk McDonald

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
"use strict"

// build target events

// The "+" button to add a new target.
export function plusHandler() {
    addTarget()
    itemUpdate()
}

// Triggered when the item dropdown box opens.
export function resetSearch(dropdown) {
    dropdown.getElementsByClassName("search")[0].value = ""

    // unhide all child nodes
    let elems = dropdown.querySelectorAll("label, hr")
    for (let elem of elems) {
        elem.style.display = ""
    }
}

// Triggered when user is searching target
export function searchTargets() {
    let ev = d3.event
    let search = this
    let search_text = search.value.toLowerCase().replace(/[^a-z0-9]+/g, "")
    let dropdown = d3.select(search.parentNode)

    if (!search_text) {
        resetSearch(search.parentNode)
        return
    }

    // handle enter key press (select target if only one is visible)
    if (ev.keyCode === 13) {
        let labels = dropdown.selectAll("label")
            .filter(function() {
                return this.style.display !== "none"
            })
        // don't do anything if more than one icon is visible
        if (labels.size() === 1) {
            let input = document.getElementById(labels.attr("for"))
            input.checked = true
            input.dispatchEvent(new Event("change"))
        }
        return
    }

    // hide non-matching labels & icons
    let currentHrHasContent = false
    let lastHrWithContent = null
    dropdown.selectAll("hr, label").each(function(item) {
        if (this.tagName === "HR") {
            if (currentHrHasContent) {
                this.style.display = ""
                lastHrWithContent = this
            } else {
                this.style.display = "none"
            }
            currentHrHasContent = false
        } else {
            let title = item.name.replace(/-/g, "")
            if (title.indexOf(search_text) === -1) {
                this.style.display = "none"
            } else {
                this.style.display = ""
                currentHrHasContent = true
            }
        }
    })
    if (!currentHrHasContent && lastHrWithContent !== null) {
        lastHrWithContent.style.display = "none"
    }
}

// Triggered when a build target's item is changed.
export function ItemHandler(target) {
    return function(item) {
        target.itemName = item.name
        target.recipeIndex = 0
        target.displayRecipes()
        itemUpdate()
    }
}

// Triggered when a build target's recipe selector is changed.
export function RecipeSelectorHandler(target, i) {
    target.recipeIndex = i
    itemUpdate()
}

// The "x" button to remove a target.
export function RemoveHandler(target) {
    this.handleEvent = function(event) {
        build_targets.splice(target.index, 1)
        for (var i=target.index; i < build_targets.length; i++) {
            build_targets[i].index--
        }
        target.element.remove()
        itemUpdate()
    }
}

// Triggered when a "Factories:" text box is changed.
export function FactoryHandler(target) {
    this.handleEvent = function(event) {
        target.factoriesChanged()
        itemUpdate()
    }
}

// Triggered when a "Rate:" text box is changed.
export function RateHandler(target) {
    this.handleEvent = function(event) {
        target.rateChanged()
        itemUpdate()
    }
}

// settings events

// Obtains current data set from UI element, and resets the world with the new
// data.
export function changeMod() {
    var modName = currentMod()

    reset()
    loadData(modName)
}

export function changeColor(event) {
    setColorScheme(event.target.value)
    display()
}

// Triggered when the display rate is changed.
export function displayRateHandler(event) {
    var value = event.target.value
    settings_displayRateFactor_modificationFunc_1()
    settings_rateName_modificationFunc_2()
    display()
}

export function changeRPrec(event) {
    settings_ratePrecision_modificationFunc_3()
    display()
}

export function changeFPrec(event) {
    settings_countPrecision_modificationFunc_4()
    display()
}

// Triggered when the "minimum assembling machine" setting is changed.
export function changeMin(min) {
    setMinimumAssembler(min)
    itemUpdate()
}

// Triggered when the furnace is changed.
export function changeFurnace(furnace) {
    spec.setFurnace(furnace.name)
    solver.findSubgraphs(spec)
    itemUpdate()
}

// Triggered when the preferred fuel is changed.
export function changeFuel(fuel) {
    setPreferredFuel(fuel.name)
    solver.findSubgraphs(spec)
    itemUpdate()
}

// Triggered when the preferred oil recipe is changed.
export function changeOil(oil) {
    setOilRecipe(oil.priority)
    itemUpdate()
}

// Triggered when the Kovarex checkbox is toggled.
export function changeKovarex(event) {
    setKovarex(event.target.checked)
    itemUpdate()
}

// Triggered when the preferred belt is changed.
export function changeBelt(belt) {
    setPreferredBelt(belt.name)
    display()
}

// Triggered when the minimum pipe length is changed.
export function changePipeLength(event) {
    setMinPipe(event.target.value)
    display()
}

// Triggered when the mining productivity bonus is changed.
export function changeMprod() {
    spec.miningProd = getMprod()
    itemUpdate()
}

// Triggered when the default module is changed.
export function changeDefaultModule(module) {
    spec.setDefaultModule(module)
    recipeTable.updateDisplayedModules()
    itemUpdate()
}

// Triggered when the default beacon module is changed.
export function changeDefaultBeacon(module) {
    spec.setDefaultBeacon(module, spec.defaultBeaconCount)
    recipeTable.updateDisplayedModules()
    itemUpdate()
}

// Triggered when the default beacon count is changed.
export function changeDefaultBeaconCount(event) {
    var count = RationalFromString(event.target.value)
    spec.setDefaultBeacon(spec.defaultBeacon, count)
    recipeTable.updateDisplayedModules()
    itemUpdate()
}

// Triggered when the visualizer setting box is toggled.
export function toggleVisualizerSettings() {
    let classes = document.getElementById("graph-wrapper").classList
    if (classes.contains("open")) {
        classes.remove("open")
    } else {
        classes.add("open")
    }
}

// Triggered when the visualizer type is changed.
export function changeVisualizerType(event) {
    settings_visualizer_modificationFunc_5()
    display()
}

// Triggered when the visualizer direction is changed.
export function changeVisualizerDirection(event) {
    settings_visDirection_modificationFunc_6()
    display()
}

// Triggered when the max node breadth is changed.
export function changeNodeBreadth(event) {
    settings_maxNodeHeight_modificationFunc_7()
    display()
}

// Triggered when the link length is changed.
export function changeLinkLength(event) {
    settings_linkLength_modificationFunc_8()
    display()
}

// Triggered when the recipe sort order is changed.
export function changeSortOrder(event) {
    display_sortOrder_modificationFunc_0()
    display()
}

// Triggered when the value format (decimal vs. rational) is changed.
export function changeFormat(event) {
    settings_displayFormat_modificationFunc_9()
    display()
}

// Triggered when fancy tooltip box is toggled.
export function changeTooltip(event) {
    settings_tooltipsEnabled_modificationFunc_10()
    display()
}

// recipe row events

export function IgnoreHandler(row) {
    this.handleEvent = function(event) {
        if (spec.ignore[row.name]) {
            delete spec.ignore[row.name]
            row.setIgnore(false)
        } else {
            spec.ignore[row.name] = true
            row.setIgnore(true)
        }
        itemUpdate()
    }
}

// Triggered when a factory module is changed.
export function ModuleHandler(row, index) {
    return function(module) {
        if (spec.setModule(row.recipe, index, module) || isFactoryTarget(row.recipe.name)) {
            itemUpdate()
        } else {
            display()
        }
    }
}

// Triggered when the right-arrow "copy module" button is pressed.
export function ModuleCopyHandler(row) {
    this.handleEvent = function(event) {
        var moduleCount = spec.moduleCount(row.recipe)
        var module = spec.getModule(row.recipe, 0)
        var needRecalc = false
        for (var i = 0; i < moduleCount; i++) {
            needRecalc = spec.setModule(row.recipe, i, module) || needRecalc
            row.setDisplayedModule(i, module)
        }
        if (needRecalc || isFactoryTarget(row.recipe.name)) {
            itemUpdate()
        } else {
            display()
        }
    }
}

// Gets Factory object for a corresponding recipe name.
export function getFactory(recipeName) {
    var recipe = solver.recipes[recipeName]
    return spec.getFactory(recipe)
}

// Triggered when a beacon module is changed.
export function BeaconHandler(recipeName) {
    return function(module) {
        var factory = getFactory(recipeName)
        factory.beaconModule = module
        if (isFactoryTarget(recipeName) && !factory.beaconCount.isZero()) {
            itemUpdate()
        } else {
            display()
        }
    }
}

// Triggered when a beacon module count is changed.
export function BeaconCountHandler(recipeName) {
    this.handleEvent = function(event) {
        var moduleCount = RationalFromString(event.target.value)
        var factory = getFactory(recipeName)
        factory.beaconCount = moduleCount
        if (isFactoryTarget(recipeName) && factory.beaconModule) {
            itemUpdate()
        } else {
            display()
        }
    }
}

// Triggered when the up/down arrow "copy to all recipes" button is pressed.
export function CopyAllHandler(name) {
    this.handleEvent = function(event) {
        var factory = spec.spec[name]
        var needRecalc = false
        for (var recipeName in spec.spec) {
            if (recipeName == name) {
                continue
            }
            var f = spec.spec[recipeName]
            if (!f) {
                continue
            }
            var recipe = solver.recipes[recipeName]
            needRecalc = factory.copyModules(f, recipe) || needRecalc || isFactoryTarget(recipeName)
        }
        recipeTable.updateDisplayedModules()
        if (needRecalc) {
            itemUpdate()
        } else {
            display()
        }
    }
}

// items tab events

export function PipeCountHandler(config) {
    this.handleEvent = function(event) {
        config.setPipes(event.target.value)
    }
}

export function PipeLengthHandler(config) {
    this.handleEvent = function(event) {
        config.setLength(event.target.value)
    }
}

// graph hover events

export function GraphMouseOverHandler(node) {
    node.highlight()
}

export function GraphMouseLeaveHandler(node) {
    if (node !== clickedNode) {
        node.unhighlight()
    }
}

var clickedNode = null

export function GraphClickHandler(node) {
    if (node === clickedNode) {
        node.unhighlight()
        clickedNode = null
    } else if (clickedNode) {
        clickedNode.unhighlight()
        clickedNode = node
    } else {
        clickedNode = node
    }
}

// tab events

export var DEFAULT_TAB = "totals_tab";

export var currentTab = DEFAULT_TAB;

var tabMap = {
    "totals_tab": "totals_button",
    "steps_tab": "steps_button",
    "graph_tab": "graph_button",
    "settings_tab": "settings_button",
    "about_tab": "about_button",
    "faq_tab": "faq_button",
    "debug_tab": "debug_button",
}

// Triggered when a tab is clicked on.
export function clickTab(tabName) {
    currentTab = tabName
    var tabs = document.getElementsByClassName("tab")
    for (var i=0; i < tabs.length; i++) {
        tabs[i].style.display = "none"
    }

    var buttons = document.getElementsByClassName("tab_button")
    for (var i=0; i < buttons.length; i++) {
        buttons[i].classList.remove("active")
    }

    document.getElementById(tabName).style.display = "block"
    var button = document.getElementById(tabMap[tabName])
    button.classList.add("active")
    if (initDone) {
        window.location.hash = "#" + formatSettings()
    }
}

// Triggered when the "Visualize" tab is clicked on.
export function clickVisualize(event, tabName) {
    clickTab(event, tabName)
    renderGraph(globalTotals, spec.ignore)
}

// debug event
export function toggleDebug(event) {
    settings_showDebug_modificationFunc_11()
    display()
}

// utility events

export function toggleVisible(targetID) {
    var target = document.getElementById(targetID)
    if (target.style.display == "none") {
        target.style.display = "block"
    } else {
        target.style.display = "none"
    }
}
