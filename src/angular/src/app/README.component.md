# Notes

## `ngOnChanges`

This lifecycle hook only changess when `@Input` properties change.

```typescript
	ngOnChanges(changes: SimpleChanges) {
		let change: SimpleChange;

		for (let propName in changes) {
			change = changes[ propName ];

			console.info('element-input.component:ngOnChanges ' + propName, change );

			switch ( propName ) {
				case 'value':
					if ( this.onChange ) this.onChange( change.currentValue );
					break;
			}
		}
	}
```
