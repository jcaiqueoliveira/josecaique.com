---
title: "Keep your feature simple"
date: 2023-04-04
draft: false
description: ""
---

Introduction
There is a natural tendency to define patterns that facilitate the development of new features in order to maintain a certain consistency among the various functionalities of an application. Such patterns can be useful, for example, when adding a new team member who may find it easier to contribute to a project since every functionality has more or less the same structure.

However, it is essential to always think about the utility that a piece of code adds to the project. Arguing, for example, that a certain piece of code exists just to maintain a pattern among all functionalities is a misconception.

Defining behavior across boundaries creates room for unnecessary complexity. It is common to abuse interfaces with only one implementation or unnecessarily create abstractions upon abstractions in an attempt to isolate and protect the code against possible future changes. You often hear, "this mapping is so that the serialization framework does not go through data layers to presentation" thus trying to avoid a debt that may not even exist in the future.

It's important to remember that functionalities undergo changes, add new behaviors, and inevitably break prematurely added patterns. Therefore, the pattern that should help in the future generates stress in the present by making any change slow or complex.

Let's look at an example
Consider the following basic structure to display a list to a user.

```Plain-text
// module/subproject
-- feature-list-characters
--- domain
--- data
--- presentation
```

The code within this module or subproject solves a very specific problem, and there is proximity between the three presented layers since parts of the system that are changed together should be close. The data, domain, and presentation layers are part of the same boundary, so communication between these layers should be simple.

Here's an example of an abstraction that should be reconsidered if it generates any value.

```kotlin
internal interface RickAndMortyService {
    suspend fun listCharacters(): List<Character>
}

internal class RickAndMortyInfraStructure @Inject constructor(
private val gateway: RickAndMortyGateway
) : RickAndMortyService {

    override suspend fun listCharacters(): List<Character> = gateway.getCharacters().results
}

internal class RickAndMortyViewModel @Inject constructor(
private val service: RickAndMortyService
) : ViewModel() {
    ...
}
```

Deleting the above interface will not make any difference? No. This interface is only part of a single functionality and will not be used anywhere else in the project. There will never be a second implementation of this interface. Creating an abstraction within the same boundary, for code that will always be changed together, does not bring much value. It's worth thinking and associating that, whenever the RickAndMortyViewModel is changed, the RickAndMortyService interface tends to undergo changes whenever the provided data changes or new behaviors are added. For example, deleting a character would force the interface to be changed.

Consider the benefit that such an interface provides; in the end, there is no reason to be complex, as these parts of the same functionality have a natural coupling (changing the RickAndMortyViewModel tends to change the RickAndMortyInfrastructure as well), and that's okay.

Defending the use of the interface as a facilitator for creating tests does not make much sense, as the RickAndMortyGateway can be replaced by a fake, and the tests will end up exercising more parts of the code by avoiding mocking RickAndMortyInfrastructure class.

Mock vs. Fake can be a topic for another time. You can look here for more information on the subject. To simplify development, instead of searching for predefined patterns, it is interesting to think about the potential use of this functionality. If what is about to be developed is something that will be isolated from the entire system, there is room to be objective and simple.

For example, what is the gain in mapping a Data Transfer Object to an annotation-free data class that will ultimately be a simple listing on the user's screen? None. What is gained by such mapping is a lack of productivity in favor of standardization that leads nowhere since it is a naturally isolated part of the system.

When simplifying, we have space to remove unnecessary things. Consider code deletion in cases like:

Check interfaces with a single implementation (it can be an indicator for removal). Remove mappings that simply serve to remove serialization annotations from classes. A mapping, when useful, tends to have validations that reduce error scenarios that the application may go through. The so-called "use case"

When to be complex
When a functionality touches various parts of a system, creating good abstractions aims to protect the application against unmapped error states. Such functionalities usually belong to the core of the system and should abuse the number of validations and rules given the impact they can have on the entire software. A very simple example is the representation of a user's document done through a primitive type like long.

`val document: Long`
There is no validation of the document that will be passed, no rule can be applied to protect the parts of the system that will use this information.

```kotlin
data class Document(private val value: Long) {
    init {
        if (isValid().not()) throw ExceptionInInitializerError("invalid document")
    }

    private fun isValid() = value.toString().length == 9
    fun get() = value
}
```

With the above validation, it is guaranteed that the entire system will always use a valid document; otherwise, the system is not initialized. Complexity here means well-defined definitions in favor of clear rules on the functioning of a feature used in various parts of the application.

Another good example is a user's session; in general, with the evolution of a product, new conditions are added to validate if a user is valid, or if the authentication is still valid. However, in general, the interface does not undergo many changes.

```kotlin
interface Session {
    fun getUser(): User
    fun login(params: UserCredentials)
    fun logout()
}
```

Regardless of the implementation details, there is little room for breaking changes, and all functionalities that depend on the session are unlikely to be impacted by internal changes to such a class.

To define a good boundary, one must understand the impact generated by the code and how isolated that functionality will be. When there is a lot of interaction between different functionalities, it is worth defining clearly and with good validations how a contract works. Focus on being cohesive.

Unhelpful patterns emerge with good intentions, those who create them usually think of simplifying day-to-day life. This is very common in applications at their beginning, thinking that with all codes following the same structure, it will be simpler to help, for example, understand the code of the colleague working next door.

Such a prerogative has a problem, as when systems grow, the reality is that the team will work independently in its piece of software. This part of the team will understand a complex number of business rules for that functionality, making it humanly impossible for the same developer to contribute to other functionalities simply because of how the code is written, as it is similar throughout the application.

So despite the intention being good, on a large scale, such definitions can become just a headache, generate slow development, and cause problems in adapting developers to a different code style since there is no clear gain in following certain standards.

So avoid predicting the future too much; keep your code simple whenever possible.
