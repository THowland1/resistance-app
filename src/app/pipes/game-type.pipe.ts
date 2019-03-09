import { Pipe, PipeTransform } from '@angular/core';
import { GameType } from 'src/enums/game-type';

@Pipe({
  name: 'gameType'
})
export class GameTypePipe implements PipeTransform {

  transform(gameType: GameType, args?: any): string {
    switch (gameType) {
      case GameType.regular:
        return "Regular"
        case GameType.hunter:
        return "Hunter"
        default:
        return "ERROR";
    }
  }

}
