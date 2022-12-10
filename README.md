## IMPLEMENTAÇÃO DO ALGORITMO RSA

## 📌 Objetivo

Este projeto foi desenvolvido para estudos e compreensão do algoritmo de criptografia RSA. Este projeto permite apenas entradas de números primos entre 2 a 100. Não foi adotado primos maiores para evitar números extremamentes grandes e complexos de manipular.

## 🔒 RSA

RSA é um algoritmo de criptografia assimétrica ou de chave pública, pois existem duas chaves que são usadas. A primeira chave é a chave pública, utilizada para criptografar ou “cifrar” os dados que vão ser enviados. A segunda chave é utilizada para descriptografar os dados, é chamada de chave privada, apenas ela consegue retornar o texto “cifrado” no texto original.

Para gerar a sua chave pública, o servidor precisa gerar dois números P e Q, sendo eles aleatórios, muito grandes e que sejam primos. Após definir os números primos, é necessário calcular o valor de N = P * Q.

Utilizaremos agora a função totiente de Euller, também chamada de phi, no N. Como P e Q são primos, phi é P -1 * Q-1, então Phi(N) = (P-1) * (Q-1).

Agora teremos que achar um outro número Aleatório E, que tem que satisfazer as condições: ser maior que 1 e menor que Phi(N), e também ser primo entre Phi(N), então 1 < E < Phi(N).

A chave pública é composta pelo N e o E.

Para criptografar devemos seguir o seguinte algoritmo: Para cada caracter, elevaremos seu valor em ASCII por E e faremos a operação modular com N.

A chave privada que será usada para descriptografar a mensagem é chamada de D, para calcular a chave privada utiliza-se D * E mod Phi(N) == 1

Utiliza-se o D para descriptografar a mensagem cifrada, para cada número da mensagem, deve-se elevar por D e fazer a operação modular por N
