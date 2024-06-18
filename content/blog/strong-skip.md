+++
title = 'Strong skipping mode by default'
date = 2024-06-16T11:53:01-03:00
+++

Recent updates from compose introduced compose strong skipping mode, which makes the compose much more efficient to deal with recomposition. Let's validate it with a simple example.

The most easy way to force recomposition it's passing a List as a parameter to some compose function as follows:

```kotlin
@Composable
fun Listing(values: List<String>) {
    Column {
        values.forEach {
            Text(text = it)
        }
    }
}
```

Every time that some recomposition happens this function will recompose. Before strong skipping mode there was 2 common approach to deal with it.

The first one was to start using [Kotlin Immutables](https://github.com/Kotlin/kotlinx.collections.immutable) library and then use ImmutableList instead of passing List as a parameter. This is straightforward manner to solve extra undesired recomposition.

```kotlin
@Composable
fun Listing(values: Immutable<String>) {
    Column {
        values.forEach {
            Text(text = it)
        }
    }
}
```

The second manner to solve it, was to basically wrap the list inside another class and mark it as Immutable

```kotlin
@Immutable
data class MyWrapper(
    val list: List<String>
)

@Composable
fun Listing(item: MyWrapper) {
    Column {
        item.list.forEach {
            Text(text = it)
        }
    }
}
```

Both fixes are simple, but you need to make sure that all team members are aware about recomposition and then guarantee the usage of the chosen solution.

Strong skipping made it easy, since compose 1.6 it comes enabled by default, you can control it via gradle:

```kotlin
composeCompiler {
    enableStrongSkippingMode = true/false

    reportsDestination = layout.buildDirectory.dir("compose_compiler")
}
```

The reports destination it's useful to read about the stability of your compose functions

Following up with an example, let's do some tests with a simple screen:

```kotlin
  StrongTheme {
    var check by remember { mutableStateOf(false) }

    val color by animateColorAsState(
        label = "ColorAnimation",
        targetValue = if (check) Color.White else Color.Cyan
    )

    Scaffold(
        containerColor = color,
        modifier = Modifier.fillMaxSize()
    ) { innerPadding ->
        Column {
            Greeting(
                name = "Android",
                modifier = Modifier.padding(innerPadding)
            )
            Switch(
                checked = check,
                onCheckedChange = {
                    check = it
                }
            )
            Listing(values = listOf("Dogs","Cats","Birds"))
        }
    }
}
```

We have some extras recomposition because of the animations added via animated*AsState. Every time the Switch changes the Listing recompose 6 times, even without any changes in the content. (To get this number I'm using layout inspector with recompose count enabled)

```Plain-text
Recomposition 
count: 6
Skips: 0
```

Let's run with strong skipping enabled:
By switching the switch between checked and unchecked, layout inspector shows that the Listing was skipped all the time with 0 recomposition (expected behavior).

```Plain-text
Recomposition 
count: 0
skips: 8
```

If we look into buil/compose_compiler folder added in the gradle configuration we will see the following report:

```kotlin
restartable skippable scheme("[androidx.compose.ui.UiComposable]") fun Listing(
  stable values: List<String>
)
```

The report is the same with strong skipping enabled or disabled, which means that the evaluations process to mark as stable, restartable remains the same. So with strong skipping enabled, all restartable composable functions will be skippable, regardless of if they have unstable parameters or not. Non-restartable composable functions remain unskippable.

To conclude, it's good to see that the tooling from compose its evolving a lot, it can make it easy to adopt in complex screens without introducing performance issues, at the same time that we do not need to worry about small details focusing on getting things done.
