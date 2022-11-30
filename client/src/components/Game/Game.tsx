import React, { useEffect, useState } from 'react';
import { Player } from '../Player';
import { io } from 'socket.io-client';
import './Game.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user.selector';
import GameDTO from '../../entities/gameDTO';
import { Button, Card, Group, Modal, Image, Badge, Text } from '@mantine/core';
import { CardDTO } from '../../entities';

export class AttackCardSelection {
  attacker!: CardDTO;
  defender!: CardDTO;
}

const socket = io('http://localhost:8087');

export const Game = () => {
  const user = useSelector(selectUser);
  const [game, setGame] = useState<GameDTO>();
  const [opened, setOpened] = useState(true);
  const [selectedCards, setSelectedCards] = useState<CardDTO[]>([]);
  const [attackCardSelection, setAttackCardSelection] =
    useState<AttackCardSelection>(new AttackCardSelection());

  const addOrRemove = (arr: CardDTO[], item: CardDTO, rm: boolean) => {
    if (rm) {
      return arr.filter((i) => i !== item);
    } else {
      return arr.includes(item)
        ? arr.filter((i) => i !== item)
        : [...arr, item];
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('startingPlay', (game: GameDTO) => {
      setGame(game);
      const gameId = game.gameId;
      socket.emit("joinGame", gameId);
    });
    socket.on('updateGame', (game: GameDTO, damage?: number) => {
      console.log('updateGame');
      setGame(game);
      if (!damage) {
        return;
      }
      if (damage === 0) 
        printMessage("Missed");
      else if (damage < 90)
        printMessage("Hit");
      else
        printMessage("Critical Hit");
      //TODO: afficher l'update de la game (annimation ou alert quand en fonctino des damage [crit, normal, miss])
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (game) {
      if (game.nextTurn === user.id) { 
        // TODO: Auto selection when only one card can be selected
      }
    }
  }, [game, user.id]);

  const connect = () => {
    socket.emit('joinWaitingList', { ...user, cards: selectedCards });
  };

  const attack = () => {
    const gameId = game?.gameId;
    const attackerId = attackCardSelection.attacker.id;
    const defenderId = attackCardSelection.defender.id;
    setAttackCardSelection(new AttackCardSelection());
    socket.emit('attack', gameId, attackerId, defenderId);
  };

  const endTurn = () => {
    const gameId = game?.gameId;
    socket.emit('endTurn', gameId);
  };

  const printMessage = (message: string) => {
    // TODO: complete
    const print = document.createElement('p');
    print.innerHTML = message;
    document.appendChild(print);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select up to 4 cards 🃏 end click on play ▶️"
        size="fit-content"
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}>
        <div className="selectCardsContainer">
          <div className="playerCards">
            {user.cards?.map((card: CardDTO) => {
              return (
                <Card
                  key={card.id}
                  className={`${
                    selectedCards.includes(card) && 'selectedCard'
                  } gameCard`}
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder>
                  <Card.Section>
                    <Image src={card.model?.imgUrl} height={80} alt="" />
                  </Card.Section>
                  <Text weight={500}>{card.model?.name}</Text>
                  <Text size="sm" color="dimmed">
                    {card.model?.description}
                  </Text>

                  <Group className="stats">
                    <Badge color="green">
                      ❤️‍🩹 : {card.hp && Math.round(card.hp)}
                    </Badge>
                    <Badge color="magenta">
                      ⚡ : {card.energy && Math.round(card.energy)}
                    </Badge>
                  </Group>
                  <Group className="stats">
                    <Badge color="red">
                      ⚔️ : {card.attack && Math.round(card.attack)}
                    </Badge>
                    <Badge color="blue">
                      🛡️ : {card.defence && Math.round(card.defence)}
                    </Badge>
                  </Group>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    disabled={
                      selectedCards.length >= 4 && !selectedCards.includes(card)
                    }
                    onClick={() =>
                      setSelectedCards((prev) =>
                        addOrRemove(prev, card, !(selectedCards.length < 4)),
                      )
                    }>
                    {selectedCards.includes(card) ? 'Remove' : 'Select'}
                  </Button>
                </Card>
              );
            })}
          </div>
          <Button
            disabled={selectedCards?.length == 0}
            onClick={() => {
              setOpened(false);
              connect();
            }}>
            Play
          </Button>
        </div>
      </Modal>
      <div id="gameContainer">
        <div id="game" className="gameSubContainer">
          <Player
            player={
              game !== undefined
                ? game.player1.id === user.id
                  ? game.player1
                  : game.player2
                : { ...user, cards: [] }
            }
            attacker={true}
            attackCardSelection={attackCardSelection}
            setAttackCardSelection={setAttackCardSelection}
          />
          {game?.nextTurn.id === user.id ? (
            <div id="controls">
              <Button className="control" onClick={() => endTurn()}>
                End turn
              </Button>
              <hr />
              <Button disabled={attackCardSelection.attacker==undefined || attackCardSelection.defender==undefined } className="control" onClick={() => attack()}>
                Attack ⚔️
              </Button>
            </div>
          ) : (
            <hr />
          )}
          {game ? (
            <Player
              attacker={false}
              attackCardSelection={attackCardSelection}
              setAttackCardSelection={setAttackCardSelection}
              player={game.player1.id === user.id ? game.player2 : game.player1}
            />
          ) : (
            <div>Waiting for opponent</div>
          )}
        </div>
        {/* <div id="chat" className="gameSubContainer">
          <Chat />
        </div> */}
      </div>
    </>
  );
};
