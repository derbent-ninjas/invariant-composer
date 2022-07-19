# invariant-composer:
### What is it?
This library provides utilities which allow you to compose validation invariants into invariants trees. And it gives you detailed information about failed invariants, their path, their error messages and other information which you can pass.

----

### Get started:
####Install:
```
npm install @derbent-ninjas/invariant-composer@0.0.1
```
#### Usage:
Create validation functions which return invariants, it can be either `fail` or `success`:

```typescript
const invariant1 = (): Invariant => {
  return success()
}

const invariant2 = (): Invariant => {
  return fail({ message: 'invariant 2 fails, because of something' })
}

const invariant3 = (): Invariant => {
  return fail({ message: 'invariant 3 fails, because of something' })
}
```

Then you can compose this invariants as a tree:
```typescript
result(
  invariants(
    invariants(
      invariants(
        invariant1()
      ).path('deepnessC'),
      invariant2(),
    ).path('deepnessB'),
    invariant3(),
  ).path('deepnessA'),
)
```

Result:

```json
{
  "status":"FAIL",
  "info": {
    "paths": {
      "deepnessA.deepnessB.deepnessC": [{"message":"invariant 1 fails, because of something"}],
      "deepnessA":[{"message":"invariant 3 fails, because of something"}]
    }
  }
}
```
Looks simple, doesn't it?

-----

### LICENCE:

This library is [MIT licensed](https://github.com/derbent-ninjas/invariant-composer/blob/main/LICENCE)
