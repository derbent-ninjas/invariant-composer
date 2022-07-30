# invariant-composer:
### What is it?
This library provides utilities which allow you to compose validation invariants into invariants trees. And it gives you detailed information about failed invariants, their path, their error messages and other information which you can pass.

----

### Get started:
#### Install:
```
npm install @derbent-ninjas/invariant-composer
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
display(
  path('deepnessA', compose(
    path('deepnessA-B1', invariant1()),
    path(
      'deepnessA-B2',
      compose(path('deepnessA-B2-C', invariant2()))
    ),
    path('deepnessA-B3', invariant3()),
  ))
)
```

Result:

```json
{
  "status":"FAIL",
  "info": {
    "paths": {
      "deepnessA.deepnessA-B2.deepnessA-B2-C":[{"message":"invariant 2 fails, because of something"}],
      "deepnessA.deepnessA-B3":[{"message":"invariant 3 fails, because of something"}]
    }
  }
}
```
Looks simple, doesn't it?

-----

### More functions:

-----
### ifExists

#### `ifExists<T>(property: T, invariantFn: (property: T) => Invariant)`
Executes invariant function only if passed value is not undefined. Otherwise, returns success() invariant.

```typescript
ifExists(name, isNameValid)
```

-----
### assert

#### `assert(path: string, invariant: Invariant)`

throw `InvariantError` if passed invariant is fail.

```typescript
const canCreateName = fail({ message: 'name is not valid' });
assert('name', canCreateName);
```

-----
### isInvariantError

#### `isInvariantError(value: any)`
returns true is passed value is invariant error.

```typescript
isInvariantError(error)
```

-----
### Guard

#### `@Guard(canActivateFn: (*arguments of decorated function*) => Invariant)`
Decorator which throws an `InvariantError` if passedCanActivate function returned fail invariant.

```typescript
class Cat {
  name: string;
  
  @Guard(canSetName)
  setName(newName: string) {
    this.name = newName;
  }
}
```

-----


### LICENCE:

This library is [MIT licensed](https://github.com/derbent-ninjas/invariant-composer/blob/main/LICENCE)
