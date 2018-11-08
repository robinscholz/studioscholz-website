<?php

jsonapi()->register([
	[
		'method' => 'GET',
		'pattern' => "data",
		'action' => function () {

			$projects = page("inventory");
			$featured = page("featured");
			$data = $projects->children()->visible();
			$studio = page("studio");
			$json = array();
			$clients = array();
			$years = array();
			$collaborators = array();
			$places = array();
			$featuredimg = array();

			//Projects API
			foreach($data as $project) {

				//Citys
				if ($project->place()->isNotEmpty() && !in_array($project->place(), $places)) {
					$places[] = (string)$project->place();
				}

				//Clients
				if ($project->client()->isNotEmpty() && !in_array($project->client(), $clients)) {
					$clients[] = $project->client()->split(',');
				}

				//Collaborators
				if ($project->collaborator()->isNotEmpty() && !in_array($project->collaborator(), $collaborators)) {
					$collaborators[] = $project->collaborator()->split(',');
				}

				//Years
				$year = preg_replace("/[^0-9]/","",$project->year());
				if ($project->year()->isNotEmpty() && !in_array($year, $years)) {
					$years[] = (string)$year;
				}

				//Images
				$n = 0;
				$images = array();
				foreach($project->images()->sortBy('sort', 'asc') as $img) {
					$n++;
					$images[$n] = array(
						"url" => $img->url(), 
						"num" => (string)$n,
						"orientation" => $img->orientation(),
						"size" => (string)$img->imgsize(),
						"color" => (string)$img->textcolor(),
					);
				};

				//Thumbs
				$n = 0;
				$thumbs = array();
				foreach($project->images()->sortBy('sort', 'asc') as $img) {
					$n++;
					$thumbs[$n] = array(
						"url" => $img->height('550')->url(),
						"num" => (string)$n,
						"orientation" => $img->orientation(),
					);
				};

				//Intro 
				$intros = array();
				foreach($studio->intro()->sortBy('sort', 'asc')->yaml() as $entry) {
					$intros[] = array(
						$entry['adddate'],
						$entry['textentry'],
						$entry['htmlcolor']
					);
				};

				//Modified
				$allmodified[]  = $project->modified('Ymd');

				$json['2-projects'][$project->uid()] = array(
					'url' => (string)$project->url(),
					'uri' => (string)$project->uri(),
					'title' => (string)$project->title(),
					'year' => (string)$project->year(),
					'place' => (string)$project->place(),
					'client' => $project->client()->split(','),
					'relation' => (string)$project->relation(),
					'collaborator' => $project->collaborator()->split(','),
					'exturl' => (string)$project->exturl(),
					'images' => $images,
					'thumbs' => $thumbs,
					'filter' => $project->searchfilter()->split(','),
				);
			};

			//Modified (add Studio)
			$allmodified[]  = $studio->modified('Ymd');
			sort($allmodified);
			$reversed = array_reverse($allmodified);
			$time = strtotime($reversed[0]);
			$modified = date('d F Y', $time);

			//Filters
			$filters = $projects->searchfilter()->split(',');

			//Sort Arrays
			sort($clients);
			sort($collaborators);
			sort($places);
			sort($years);
			sort($filters);

			//Featured
			$n = 0;
			$images = array();
			foreach($featured->images()->sortBy('sort', 'asc') as $img) {
				$proj = $img->project()->toPage();
				if ($proj) {
						$uid = (string)$proj->uid();
						$uri = (string)$proj->uri();
					} else {
						$uid = false;
						$uri = false;
					}
				$featuredimg[$n] = array(
					"url" => $img->url(), 
					"num" => (string)$n,
					"orientation" => $img->orientation(),
					"size" => (string)$img->imgsize(),
					"color" => (string)$img->textcolor(),
					"uid" => $uid,
					"uri" => $uri,
				);
				$n++;
			};

			//Studio API
			$json["1-studio"] = array(
				'title' => (string)site()->title(),
				'intros' => $intros,
				'info' => (string)$studio->about()->kirbytext(),
				'shortinfo' => (string)site()->description(),
				'mail' => (string)$studio->email(),
				'filters' => $filters,
				'clients' => $clients,
				'years' => $years,
				'collaborators' => $collaborators,
				'places' => $places,
				'modified' => $modified,
				'imprint' => (string)$studio->imprint()->kirbytext(),
				'infoimg' => (string)$studio->aboutimg()->toFile()->url(),
				'infoimgcaption' => (string)$studio->aboutimg()->toFile()->caption()->kirbytext(),
				'timezone' => (string)$studio->timezone(),
				'city' => (string)$studio->city(),
				'featuredimg' => $featuredimg,
			);

			return json_encode($json);
		}
	],
]);
