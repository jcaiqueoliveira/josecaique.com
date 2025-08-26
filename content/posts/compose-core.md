+++
title = 'Compose reactive architecture - part 1'
date = 2024-06-17T20:43:12-03:00
draft = true
+++

Compose it's an interesting framework, the core mechanism of recomposition can be good or a bad thing. In this article let's see how to use it in favor of a reactive architecture.

Compose has two different layers that are important to the context of this article.
Compose UI it's responsible, as you can imagine, to the visual layer of compose functions, ```Text("hello")``` will introduce a text component to the screen. While compose core has many mechanisms to deal, for instance, with recomposition.

Recomposition is the process of calling your composable functions again when inputs change. This happens when the function's inputs change. When Compose recomposes based on new inputs, it only calls the functions or lambdas that might have changed, and skips the rest. By skipping all functions or lambdas that don't have changed parameters, Compose can recompose efficiently. [[1]](https://developer.android.com/develop/ui/compose/mental-model#recomposition)

At the UI level, the [strong skipping mode](https://josecaique.com/blog/strong-skip/) enabled by default in latest compose version, its optimized avoids extras recomposition, which brings even better performance when creating screens with compose.

[Molecule](https://github.com/cashapp/molecule) and [Circuit](https://github.com/slackhq/circuit) introduced an interesting proposal. Compose architecture that rely on compose recomposition as a reactive framework. So every time that a value changes compose automatically emits a new state that will automatically update the UI. This means that it's possible to stop spreading ```mutableFlow.update {}``` call inside the view model/presenter etc. Personally I feel that Circuit it's a bit too much forcing a project to rely completely on 3rd party library on an important part of the code, refactoring from Circuit to other approach could be difficult.

We can add compose to a view model without any of the libraries above, as follows:

```kotlin
class SampleViewModel : ViewModel() {

    private var checked by mutableStateOf(false)

    @Composable
    fun viewState(): MyState {
        return MyState(
            checked = checked
        )
    }

    fun checkedChange(isChecked: Boolean) {
        this.checked = isChecked
    }
}

data class MyState(
    val checked: Boolean = false
)
```

At UI level you can use it as usual

```kotlin
val state = vm.viewState()
Switch(
    checked = state.checked,
    onCheckedChange = vm::checkedChange
)
```

The important thing here is to avoid any usage of compose UI element such as ```Text```, otherwise it's possible to use any other API. Notice that is not needed to do any manual update to send a new state to the view, it automatically recomposes keeping the view up to date.

```kotlin
 @Composable
fun viewState(): MyState {
    LaunchedEffect(Unit) {
        val result = api.aSuspendRequestAppears()
        // do something with the result
    }

    return MyState(
        checked = checked
    )
}
```

[Kotlin state manager](https://github.com/programadorthi/kotlin-state-manager) library that caught my attention specially because there is an easy way to do state restoration using compose API using `SaveableStateRegistry`.

```kotlin
class SampleViewModel(
    private val current: SaveableStateRegistry
) : ViewModel() {

    private var checked by composeValueManager( false, stateRegistry = current)

    @Composable
    fun viewState(): MyState {
      
        return MyState(
            checked = checked
        )
    }
    // ...
}
```

See [Compose value manager](https://github.com/programadorthi/kotlin-state-manager/blob/master/compose/common/src/dev/programadorthi/state/compose/ComposeValueManagerState.kt) to access the implementation detail.

The "challenge" here will be to construct the view model with an instance of *SaveableStateRegistry*, it can be easily resolved when creating the view model instance on a compose function, then the saveableState can be obtained by calling `LocalSaveableStateRegistry.current`

The second part of this article will cover the test part and view model injection passing the *SaveableStateRegistry*.
