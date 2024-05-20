'use strict';

//splash部分のJS//

$(window).on('load', function () {
  $('#spash-logo').delay(500).fadeOut('slow'); //ロゴを0.5秒でフェードアウト
});
//splashエリアを1.2秒後にフェードアウトした後に動かしたいJS//
$('#splash').delay(1200).fadeOut('slow', function () {
  $('body').addClass('appear');
});

//openbtn部分とg-nav部分のJS//
$(".openbtn").click(function () {//ボタンがクリックされたら
  $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
  $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
  $("#header,#container,#footer").toggleClass('mainblur');//ぼかしたいエリアにmainblurクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
  $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
  $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去し
  $("#header,#container,#footer").removeClass('mainblur');//ぼかしているエリアのmainblurクラスを除去
});

//スクロールに併せてヘッダー背景画像が拡大する仕様のJS
$(window).scroll(function () {
  var scroll = $(window).scrollTop();//スクロール値を定義
  //header-imgの背景
  $('#header-img').css({
    transform: 'scale(' + (100 + scroll / 10) / 100 + ')',//スクロール値を代入してscale1から拡大.scroll/10の値を小さくすると拡大値が大きくなる
    top: -(scroll / 50) + "%",//スクロール値を代入してtopの位置をマイナスにずらす
  });
});


//文字を１文字ずつ出現させる仕様のJS//

function TextAnimeControl() {
  $('.textAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appeartext");

    } else {
      $(this).removeClass("appeartext");
    }
  });
}

// 画面をスクロールをしたら動く場合の記述
$(window).scroll(function () {
  TextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動く場合の記述
$(window).on('load', function () {
  //spanタグを追加する
  var element = $(".textAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
        }

      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  TextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


//ジャンプアップボタン：ページ内にある指定の範囲内で下から出現//

//スクロールした際の動きを関数でまとめる
function setFadeElement(){
	var windowH = $(window).height();	//ウィンドウの高さを取得
	var scroll = $(window).scrollTop(); //スクロール値を取得
    
    //出現範囲の指定
	var contentsTop = Math.round($('#service').offset().top);	//要素までの高さを取得
	var contentsH = $('#service').outerHeight(true);	//要素の高さを取得

  //2つ目の出現範囲の指定※任意
	var contentsTop2 = Math.round($('#footer').offset().top);	//要素までの高さを取得
	var contentsH2 = $('#footer').outerHeight(true);//要素の高さを取得

    //出現範囲内に入ったかどうかをチェック
	if(scroll+windowH >= contentsTop && scroll+windowH  <= contentsTop+contentsH){
		$("#page-top").addClass("UpMove");    //入っていたらUpMoveをクラス追加
		$("#page-top").removeClass("DownMove");   //DownMoveを削除
		$(".hide-btn").removeClass("hide-btn");	  //hide-btnを削除
	}//2つ目の出現範囲に入ったかどうかをチェック※任意
   else if(scroll+windowH >= contentsTop2 && scroll+windowH <= contentsTop2+contentsH2){       
		$("#page-top").addClass("UpMove");    //入っていたらUpMoveをクラス追加
		$("#page-top").removeClass("DownMove");   //DownMoveを削除
	}//それ以外は
    else{
        if(!$(".hide-btn").length){				//サイト表示時にDownMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
        $("#page-top").addClass("DownMove");  //DownMoveをクラス追加
		$("#page-top").removeClass("UpMove"); //UpMoveを削除	
        }
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	setFadeElement();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	setFadeElement();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});


// ====複数画像を並列に見せるスライダー部分====

$('.slider').slick({
  autoplay: true,//自動的に動き出すか。初期値はfalse。
  infinite: true,//スライドをループさせるかどうか。初期値はtrue。
  slidesToShow: 4,//スライドを画面に3枚見せる
  slidesToScroll: 4,//1回のスクロールで3枚の写真を移動して見せる
  prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
  dots: true,//下部ドットナビゲーションの表示
  responsive: [
          {
    breakpoint: 1200,//モニターの横幅が1200px以下の見せ方
    settings: {
      slidesToShow: 3,//スライドを画面に2枚見せる
      slidesToScroll: 3,//1回のスクロールで2枚の写真を移動して見せる
    }
  },
    {
    breakpoint: 769,//モニターの横幅が769px以下の見せ方
    settings: {
      slidesToShow: 2,//スライドを画面に2枚見せる
      slidesToScroll: 2,//1回のスクロールで2枚の写真を移動して見せる
    }
  },
  {
    breakpoint: 426,//モニターの横幅が426px以下の見せ方
    settings: {
      slidesToShow: 1,//スライドを画面に1枚見せる
      slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    }
  }
]
});

// ====背景に青い花片が舞う仕様のJS====

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 20,//この数値を変更すると花片の数が増減できる
      "density": {
        "enable":true,
        "value_area":1121.6780303333778
      }
    },
    "color": {
      "value":"#fff"
    },
    "shape": {
      "type":"image",//形状は画像を指定
      "stroke": {
        "width":0,
      },
      "image": {
        "src":"images/background-flower.png",//画像を指定
        "width":120,
        "height":120
      }
    },
    "opacity": {
      "value":0.06409588744762158,
      "random":true,
      "anim": {
        "enable":false,
        "speed":1,
        "opacity_min":0.1,
        "sync":false
      }
    },
    "size": {
      "value":8.011985930952697,
      "random":true,//サイズをランダムに
      "anim": {
        "enable":false,
        "speed":4,
        "size_min":0.1,
        "sync":false
      }
    },
    "line_linked": {
      "enable":false,
    },
    "move": {
      "enable":true,
      "speed":7,//この数値を小さくするとゆっくりな動きになる
      "direction":"bottom-right",//右下に向かって落ちる
      "random":false,//動きはランダムにしない
      "straight":false,//動きをとどめない
      "out_mode":"out",//画面の外に出るように描写
      "bounce":false,//跳ね返りなし
      "attract": {
        "enable":false,
        "rotateX":281.9177489524316,
        "rotateY":127.670995809726
      }
    }
  },
  "interactivity": {
    "detect_on":"canvas",
    "events": {
      "onhover": {
        "enable":false,
      },
      "onclick": {
        "enable":false,
      },
      "resize":true
    }
  },
  "retina_detect":false
});