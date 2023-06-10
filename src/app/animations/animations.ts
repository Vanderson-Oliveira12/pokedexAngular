import { trigger, state, style, animate, transition, keyframes, group } from "@angular/animations";



export const cardHoverTrigger = trigger('pokeHover', [
  state(
    'initial',
    style({
      transform: 'scale(1)',
    })
  ),
  state(
    'end',
    style({
      transform: 'scale(1.05)',
    })
  ),
  transition('* => *', [animate(300)]),
]);

export const pokemonImageTrigger = trigger("pokemonImageShown" , [
  transition(":enter", [
    group([
      animate(1000, keyframes([
        style({offset: 0, transform: "translateX(200px)", opacity: 0}),
        style({offset: .5, transform: "translateX(100px)", opacity: .4}),
        style({offset: 0.8, transform: "translateX(50px)", opacity: .8}),
        style({offset: 1, transform: "translateX(0)", opacity: 1}),
      ]))
    ])
  ])
]);

export const NavTrigger = trigger("navFade", [
  transition(":enter", [
    group([
      animate(1000, keyframes([
        style({offset: 0, transform: "translateY(-200px)", opacity: 0}),
        style({offset: .5, transform: "translateY(-100px)", opacity: .4}),
        style({offset: 0.8, transform: "translateY(-50px)", opacity: .8}),
        style({offset: 1, transform: "translateY(0)", opacity: 1}),
      ]))
    ])
  ])
])

